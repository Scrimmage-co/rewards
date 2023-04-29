import { RewardUser } from './types/RewardUser';
import API from './api';

const getAllForRewarder = async (
  privateKeyAlias: string,
): Promise<RewardUser> => {
  return API.getAllIntegrationUsers(privateKeyAlias);
};

const User = {
  getAllForRewarder,
};

export default User;
