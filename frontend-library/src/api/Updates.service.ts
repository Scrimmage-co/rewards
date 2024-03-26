import { EventEmitter } from 'events';
import { io, Socket } from 'socket.io-client';
import {
  EVENT_INVALIDATION_MAPPING,
  GameEventType,
  ScrimmageBaseApiTagType,
} from '@scrimmage/schemas';
import { uniqueReducer } from '@scrimmage/utils';
import { createBufferTime } from '../utils/utils';
import { decorate, inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { CONFIG_INJECT_KEY } from '../config';
import { InitOptions } from '../types/InitOptions';
import { LoggerService } from '../utils/Logger.service';

decorate(injectable(), EventEmitter);

@injectable()
export class Updates extends EventEmitter {
  private socket: Socket;

  constructor(
    @inject(HttpService)
    private httpService: HttpService,
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
    @inject(LoggerService)
    private logger: LoggerService,
  ) {
    super();
    this.httpService.onUserTokenChange(() => {
      this.logger.log('User token changed. Reconnecting to websocket');
      this.init();
    });
    this.init();
  }

  private init() {
    this.logger.log(
      'Initializing websocket connection',
      this.options,
      this.httpService.userToken,
    );
    if (!this.httpService.userToken) {
      this.logger.log('No token provided. Skipping socket connection.');
      return;
    }

    this.socket = io(this.options.apiServerEndpoint, {
      addTrailingSlash: false,
      path: '/nbc/events/socket.io',
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${this.httpService.userToken}`,
      },
    });

    const bufferNext = createBufferTime<GameEventType>(500, events => {
      this.emit('game.events', events);
      const tags = events
        .flatMap(event => EVENT_INVALIDATION_MAPPING[event])
        .reduce<ScrimmageBaseApiTagType[]>(uniqueReducer, [])
        .filter(tag => Boolean(tag));
      this.emit('refresh.events', tags);
    });

    this.socket.once('connect', () => {
      this.logger.log('Connected to Scrimmage Rewards websocket');
    });

    this.socket.on('game.events.update', bufferNext);

    this.socket.on('connect_error', err => {
      this.logger.log(`connect_error due to ${err}`);
    });
  }
}
