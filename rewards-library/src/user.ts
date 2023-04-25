import { RewardUser } from './types/RewardUser';
import API from './api';

const getAll = async (): Promise<RewardUser> => {
  return API.getAllIntegrationUsers();
};

const User = {
  getAll,
};

export default User;
