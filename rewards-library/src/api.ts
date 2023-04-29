import { Rewardable } from './types/Rewardables';
import Config from './config';
import axios, { HttpStatusCode, AxiosError } from 'axios';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';

const createIntegrationReward = <T extends Rewardable = Rewardable>(
  privateKeyAlias: string,
  reward: T,
): Promise<any> => {
  const privateKey = Config.getPrivateKeyOrThrow(privateKeyAlias);
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

const getAllIntegrationUsers = (privateKeyAlias: string): Promise<any> => {
  const privateKey = Config.getPrivateKeyOrThrow(privateKeyAlias);
  const serviceUrl = Config.getServiceUrl('api');

  return axios
    .get(`${serviceUrl}/integrations/users`, {
      headers: {
        Authorization: `Token ${privateKey}`,
      },
    })
    .then((response) => response.data);
};

const API = {
  createIntegrationReward,
  getAllIntegrationUsers,
};

export default API;
