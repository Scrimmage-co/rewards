import { Rewardable } from './types/Rewardables';
import Config from './config';
import axios, { HttpStatusCode, AxiosError } from 'axios';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';
import { GetUserResourcesResponse } from './types/Resources';

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

const getUserToken = (
  userId: string,
  privateKeyAliases: string[],
): Promise<string> => {
  const privateKeys = privateKeyAliases.map((alias) =>
    Config.getPrivateKeyOrThrow(alias),
  );
  const serviceUrl = Config.getServiceUrl('api');

  return axios
    .post(`${serviceUrl}/integrations/users`, {
      id: userId,
      rewarderKeys: privateKeys,
    })
    .then((response) => response.data.token);
};

const levelUp = (itemId: number, token: string): Promise<any> => {
  return axios
    .patch(
      `${Config.getServiceUrl('p2e')}/items/${itemId}/level-up`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response.data);
};

const acceptQuest = (questId: number, token: string): Promise<any> => {
  return axios
    .post(
      `${Config.getServiceUrl('p2e')}/players/@me/quests/${questId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response.data);
};

const getQuests = (token: string): Promise<any> => {
  return axios
    .get(
      `${Config.getServiceUrl('p2e')}/players/@me/quests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response.data);
};

const getResources = (
  userId: string,
  token: string,
): Promise<GetUserResourcesResponse> => {
  return axios
    .get(`${Config.getServiceUrl('p2e')}/resources/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

const getScrimRate = (): Promise<any> => {
  return axios
    .get(`${Config.getServiceUrl('p2e')}/rate`)
    .then((response) => response.data);
};

const API = {
  createIntegrationReward,
  getAllIntegrationUsers,
  getUserToken,
  levelUp,
  getResources,
  acceptQuest,
  getQuests,
  getScrimRate,
};

export default API;
