import Config from './config';
import * as crypto from 'crypto';
import { RewardUser, RewardUserDetails } from './types/RewardUser';
import API from './api';

const getOne = async (userId: string): Promise<RewardUserDetails> => {
  const profile = await API.getIntegrationUserProfile(userId);
  return {
    userId: userId,
    tokens: profile.tokens,
  };
};

const getAll = async (): Promise<RewardUser> => {
  return API.getAllIntegrationUsers();
};

const generateLoginLink = (userId: string) => {
  const config = Config.getConfigOrThrow();
  const signature = crypto
    .createHmac('sha256', config.privateKey)
    .update(`${config.rewarderId};${userId}`)
    .digest('hex');
  return `${config.loginUrl}&rewarderId=${config.rewarderId}&userId=${userId}&signature=${signature}`;
};

const User = {
  getAll,
  getOne,
  generateLoginLink,
};

export default User;
