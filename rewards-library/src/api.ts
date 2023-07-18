import Config from './config';
import axios, { HttpStatusCode, AxiosError } from 'axios';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';
import { IIntegrationUserDTO, Rewardable } from '@scrimmage/schemas';

const createIntegrationReward = <T extends Rewardable = Rewardable>(
  reward: T,
): Promise<any> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');

  return axios
    .post(
      `${serviceUrl}/integrations/rewards`,
      {
        rewardable: reward,
      },
      {
        headers: {
          Authorization: `Token ${privateKey}`,
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

const getAllIntegrationUsers = (): Promise<IIntegrationUserDTO[]> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');

  return axios
    .get(`${serviceUrl}/integrations/users`, {
      headers: {
        Authorization: `Token ${privateKey}`,
      },
    })
    .then((response) => response.data);
};

const getUserToken = (userId: string, tags: string[]): Promise<string> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');

  return axios
    .post(
      `${serviceUrl}/integrations/users`,
      {
        id: userId,
        tags,
      },
      {
        headers: {
          Authorization: `Token ${privateKey}`,
        },
      },
    )
    .then((response) => response.data.token);
};

const API = {
  createIntegrationReward,
  getAllIntegrationUsers,
  getUserToken,
};

export default API;
