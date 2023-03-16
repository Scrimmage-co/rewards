import Config from './config';
import * as crypto from 'crypto';

const getOne = async () => {
  throw new Error('Not implemented');
};

const getAll = async () => {
  throw new Error('Not implemented');
};

const generateLoginLink = (userId: string) => {
  const config = Config.getConfigOrThrow();
  const signature = crypto
    .createHmac('sha256', config.privateKey)
    .update(config.privateKey + userId)
    .digest('hex');
  return `${config.loginUrl}&rewarderId=${config.rewarderId}&userId=${userId}&signature=${signature}`;
};

const User = {
  getAll,
  getOne,
  generateLoginLink,
};

export default User;
