import API from './api';
import { IIntegrationUserDTO } from '@scrimmage/schemas';

const getUserToken = async (
  userId: string,
  options?: {
    tags?: string[];
    properties?: Record<string, any>;
  },
): Promise<string> => {
  return API.getUserToken(userId, options);
};

const User = {
  getUserToken,
};

export default User;
