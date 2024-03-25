import { io, Socket } from 'socket.io-client';
import {
  EVENT_INVALIDATION_MAPPING,
  GameEventType,
  ScrimmageBaseApiTagType,
} from '@scrimmage/schemas';
import { uniqueReducer } from '@scrimmage/utils';
import { createBufferTime } from '../utils/utils';
import { inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { CONFIG_INJECT_KEY } from '../config';
import { InitOptions } from '../types/InitOptions';

@injectable()
export class WebsocketUpdates {
  private onRefreshEvents: (tags: ScrimmageBaseApiTagType[]) => void;
  private onGameEvents: (events: GameEventType[]) => void;
  private socket: Socket;

  constructor(
    @inject(HttpService)
    private httpService: HttpService,
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
  ) {
    this.httpService.onUserTokenChange(() => {
      console.log('User token changed. Reconnecting to websocket');
      this.init();
    });
    this.init();
  }

  private init() {
    console.log(
      'Initializing websocket connection',
      this.options,
      this.httpService.userToken,
    );
    if (!this.httpService.userToken) {
      console.log('No token provided. Skipping socket connection.');
      return;
    }

    // this.socket = lookup({
    //   path: `${this.options.apiServerEndpoint}/nbc/events/socket.io`,
    //   addTrailingSlash: false,
    //   extraHeaders: {
    //     Authorization: `Bearer ${this.httpService.userToken}`,
    //   },
    // });

    this.socket = io(`${this.options.apiServerEndpoint}/nbc/events/socket.io`, {
      extraHeaders: {
        Authorization: `Bearer ${this.httpService.userToken}`,
      },
    });

    const bufferNext = createBufferTime<GameEventType>(500, events => {
      this.onGameEvents(events);
      const tags = events
        .flatMap(event => EVENT_INVALIDATION_MAPPING[event])
        .reduce<ScrimmageBaseApiTagType[]>(uniqueReducer, [])
        .filter(tag => Boolean(tag));
      this.onRefreshEvents(tags);
    });

    this.socket.once('connect', () => {
      console.log('Connected to websocket');

      this.socket.on('game.events.update', bufferNext);
    });

    this.socket.on('connect_error', err => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  public subscribeOnRefreshEvents(
    callback: (tags: ScrimmageBaseApiTagType[]) => void,
  ) {
    this.onRefreshEvents = callback;
  }

  public subscribeOnGameEvents(callback: (events: GameEventType[]) => void) {
    this.onGameEvents = callback;
  }
}
