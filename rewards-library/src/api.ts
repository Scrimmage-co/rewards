import { Rewardable } from './types/Rewardables';
import Config from './config';
import axios, { HttpStatusCode, AxiosError } from 'axios';
import { EntityNotFoundException } from './exceptions/EntityNotFound.exception';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';

const createIntegrationReward = <T extends Rewardable = Rewardable>(
  reward: T,
): Promise<any> => {
  const config = Config.getConfigOrThrow();

  return axios
    .post(
      `${config.baseUrl}/integrations/rewards`,
      {
        rewardable: reward,
      },
      {
        headers: {
          Authorization: `Token ${config.privateKey}`,
        },
      },
    )
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      if (error.response.status === HttpStatusCode.NotFound) {
        return Promise.reject(new AccountNotLinkedException(reward.userId));
      }
      return Promise.reject(error);
    });
};

const getAllIntegrationUsers = (): Promise<any> => {
  const config = Config.getConfigOrThrow();

  return axios
    .get(`${config.baseUrl}/integrations/users`, {
      headers: {
        Authorization: `Token ${config.privateKey}`,
      },
    })
    .then((response) => response.data);
};

const getIntegrationUserProfile = (userId: string): Promise<any> => {
  const config = Config.getConfigOrThrow();

  return axios
    .get(`${config.baseUrl}/integrations/users/${userId}/profile`, {
      headers: {
        Authorization: `Token ${config.privateKey}`,
      },
    })
    .then((response) => response.data)
    .catch((cause: AxiosError) => {
      if (cause.response.status === HttpStatusCode.NotFound) {
        return Promise.reject(new EntityNotFoundException(userId, 'User'));
      }
      return Promise.reject(cause);
    });
};

const API = {
  createIntegrationReward,
  getAllIntegrationUsers,
  getIntegrationUserProfile,
};

export default API;
