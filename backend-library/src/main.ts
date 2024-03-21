import logger from './logger';
import Config, { RewarderConfig } from './config';
import User from './user';
import Reward from './reward';
import Service from './service';

const initRewarder = async (config: RewarderConfig) => {
  Config.setConfig(config);

  await Service.verify();

  logger.log('Rewarder Initiated');
};

const Scrimmage = {
  initRewarder,
  user: User,
  reward: Reward,
};

export default Scrimmage;
