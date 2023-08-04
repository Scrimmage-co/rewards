import Config, { RewardService, RewardServices } from './config';
import axios, { HttpStatusCode } from 'axios';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';
import { IIntegrationUserDTO, Rewardable } from '@scrimmage/schemas';

const createIntegrationReward = async <T extends Rewardable = Rewardable>(
  reward: T,
): Promise<any> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');

  try {
    const response = await axios.post(
      `${serviceUrl}/integrations/rewards`,
      {
        rewardable: reward,
      },
      {
        headers: {
          Authorization: `Token ${privateKey}`,
        },
      },
    );
    return await response.data;
  } catch (error) {
    if (error.response.status === HttpStatusCode.NotFound) {
      return Promise.reject(new AccountNotLinkedException(reward.userId));
    }
    return Promise.reject(error);
  }
};

const getAllIntegrationUsers = async (): Promise<IIntegrationUserDTO[]> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');

  const response = await axios.get(`${serviceUrl}/integrations/users`, {
    headers: {
      Authorization: `Token ${privateKey}`,
    },
  });
  return response.data;
};

const getUserToken = async (
  userId: string,
  tags: string[],
): Promise<string> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');

  const response = await axios.post(
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
  );
  return await response.data.token;
};

const getServiceStatus = async (service: RewardService): Promise<any> => {
  const response = await axios.get(`${Config.getServiceUrl(service)}/system/status`);
  return response.data;
};

const getOverallServiceStatus = async (): Promise<any> => {
  const result = await Promise.allSettled(
    RewardServices.map((service) => getServiceStatus(service)),
  );
  return result.every((r) => r.status === 'fulfilled');
};

const getIntegrationDetails = async (): Promise<any> => {
  const privateKey = Config.getPrivateKeyOrThrow();

  const response = await axios.get(
    `${Config.getServiceUrl('api')}/integrations/details`,
    {
      headers: {
        Authorization: `Token ${privateKey}`,
      },
    },
  );
  return response.data;
};

const API = {
  createIntegrationReward,
  getAllIntegrationUsers,
  getUserToken,
  getServiceStatus,
  getOverallServiceStatus,
  getIntegrationDetails,
};

export default API;
