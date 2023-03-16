import logger from './logger';
import Config, { RewarderConfig } from './config';
import User from './user';
import Reward from './reward';
import Promotion from './promotion';

const initRewarder = (config: RewarderConfig) => {
  Config.setConfig(config);

  // TODO: verify rewarderID and private key by making call on backend
  logger.log('Rewarder Initiated');
};

const Scrimmage = {
  initRewarder,
  user: User,
  reward: Reward,
  promotion: Promotion,
};

export default Scrimmage;
