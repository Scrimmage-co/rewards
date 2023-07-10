import API from './api';
import { IIntegrationUserDTO } from '@scrimmage/schemas';

const getAllForRewarder = async (): Promise<IIntegrationUserDTO[]> => {
  return API.getAllIntegrationUsers();
};

const getUserToken = async (userId: string): Promise<string> => {
  return API.getUserToken(userId);
};

const User = {
  getAllForRewarder,
  getUserToken,
};

export default User;
