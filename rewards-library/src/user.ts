import API from './api';
import { IIntegrationUserDTO } from '@scrimmage/schemas';

const getAllForRewarder = async (): Promise<IIntegrationUserDTO[]> => {
  return API.getAllIntegrationUsers();
};

const getUserToken = async (
  userId: string,
  tags: string[],
): Promise<string> => {
  return API.getUserToken(userId, tags);
};

const User = {
  getAllForRewarder,
  getUserToken,
};

export default User;
