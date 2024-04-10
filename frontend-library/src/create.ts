import { Container } from 'inversify';
import { Instance } from './types/Instance';
import { GameRuleService } from './api/GameRule.service';
import { PlayerService } from './api/Player.service';
import { InitOptions } from './types/InitOptions';
import { CONFIG_INJECT_KEY } from './config';
import { HttpService } from './utils/Http.service';
import { LoggerService } from './utils/Logger.service';
import { Updates } from './api/Updates.service';
import { OnInstanceInit } from './types/OnInstanceInit';

const Components: any[] = [
  PlayerService,
  GameRuleService,
  HttpService,
  Updates,
  LoggerService,
];

export const create = (options: InitOptions): Instance => {
  let isInitialized = false;
  if (!options.apiServerEndpoint) {
    throw new Error('API Server Endpoint is required');
  }
  if (!options.refreshToken) {
    throw new Error('Refresh Token is required');
  }
  options.apiServerEndpoint = options.apiServerEndpoint.endsWith('/')
    ? options.apiServerEndpoint.slice(0, -1)
    : options.apiServerEndpoint;

  const container = new Container();
  container.bind(CONFIG_INJECT_KEY).toConstantValue(options);

  for (const provider of Components) {
    container.bind(provider).toSelf().inSingletonScope();
  }
  handleInstanceInitForComponent(container, Components)
    .then(() => {
      options.onReady?.();
      isInitialized = true;
    });
  return {
    _container: container,
    api: {
      gameRules: container.get(GameRuleService),
      player: container.get(PlayerService),
      updates: container.get(Updates),
    },
    isInitialized: () => isInitialized,
  };
};

const handleInstanceInitForComponent = async (
  container: Container,
  components: any[],
) => {
  for (const provider of components) {
    const component = container.get<OnInstanceInit>(provider);
    if (component.onInstanceInit) {
      await component.onInstanceInit();
    }
  }
}
