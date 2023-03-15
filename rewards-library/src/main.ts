import * as crypto from 'crypto';
import logger from './logger';
import Config, { RewarderConfig } from './config';

export const initRewarder = (config: RewarderConfig) => {
  Config.setConfig(config);

  //TODO: verify rewarderID and private key by making call on backend
  logger.log('Rewarder Initiated');
}

export const generateLoginLink = (userId: string) => {
  const config = Config.getConfigOrThrow();
  const signature = crypto
    .createHmac('sha256', config.privateKey)
    .update(config.privateKey + userId)
    .digest('hex')
  return `${config.loginUrl}&rewarderId=${config.rewarderId}&userId=${userId}&signature=${signature}`
}

const Scrimmage = {
  initRewarder,
  generateLoginLink,
}

export default Scrimmage;
