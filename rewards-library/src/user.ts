import { RewardUser } from './types/RewardUser';
import API from './api';

const getAllForRewarder = async (
  privateKeyAlias: string,
): Promise<RewardUser> => {
  return API.getAllIntegrationUsers(privateKeyAlias);
};

const getUserToken = async (
  userId: string,
  privateKeyAliases: string[],
): Promise<string> => {
  return API.getUserToken(userId, privateKeyAliases);
};

const User = {
  getAllForRewarder,
  getUserToken,
};

export default User;
