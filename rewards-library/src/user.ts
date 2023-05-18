import { RewardUser } from './types/RewardUser';
import API from './api';
import { GetUserResourcesResponse } from './types/Resources';

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

const levelUp = async (itemId: number, token: string): Promise<any> => {
  return API.levelUp(itemId, token);
};

const getResources = async (
  userId: string,
  token: string,
): Promise<GetUserResourcesResponse> => {
  return API.getResources(userId, token);
};

const User = {
  getAllForRewarder,
  getUserToken,
  levelUp,
  getResources,
};

export default User;
