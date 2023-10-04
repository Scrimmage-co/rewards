import API from './api';
import { IIntegrationUserDTO } from '@scrimmage/schemas';

const getAllForRewarder = async (): Promise<IIntegrationUserDTO[]> => {
  return API.getAllIntegrationUsers();
};

const getUserToken = async (
  userId: string,
  options?: {
    tags?: string[],
    properties?: Record<string, any>,
  },
): Promise<string> => {
  return API.getUserToken(userId, options);
};

const User = {
  getAllForRewarder,
  getUserToken,
};

export default User;
