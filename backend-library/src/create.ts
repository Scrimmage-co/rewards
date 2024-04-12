import { APIService } from './components/API.service';
import { ConfigService } from './components/Config.service';
import { LoggerService } from './components/Logger.service';
import { RewardService } from './components/Reward.service';
import { StatusService } from './components/Status.service';
import { UserService } from './components/User.service';
import { RewarderConfig } from './types/RewarderConfig';
import { Container } from 'inversify';

const components: any[] = [
  APIService,
  ConfigService,
  LoggerService,
  RewardService,
  StatusService,
  UserService,
];

export const createScrimmageInstance = async (config: RewarderConfig) => {
  const container = new Container();
  components.forEach((component) => {
    container.bind(component).toSelf().inSingletonScope();
  });

  const configService = container.get(ConfigService);
  configService.setConfig(config);
  const statusService = container.get(StatusService);
  await statusService.verify();
  const loggerService = container.get(LoggerService);
  loggerService.log('Rewarder Initiated');

  return {
    _container: container,
    user: container.get(UserService),
    reward: container.get(RewardService),
  };
}

export type ScrimmageInstance = Awaited<ReturnType<typeof createScrimmageInstance>>;
