import Config, { RewardService, RewardServices } from './config';
import axios, { HttpStatusCode } from 'axios';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';
import { IIntegrationUserDTO, IRewardableEventDTO, Rewardable } from '@scrimmage/schemas';

const createIntegrationReward: ScrimmageAPI['createIntegrationReward'] = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  uniqueIdOrReward: string | T,
  reward?: T,
): Promise<IRewardableEventDTO> => {
  const uniqueId = typeof uniqueIdOrReward === 'string' ? uniqueIdOrReward : undefined;
  const rewardable = typeof uniqueIdOrReward === 'string' ? reward : uniqueIdOrReward;
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');
  const namespace = Config.getNamespaceOrThrow();

  try {
    const response = await axios.post<IRewardableEventDTO>(
      `${serviceUrl}/integrations/rewards`,
      {
        uniqueId,
        userId,
        dataType,
        body: rewardable,
      },
      {
        headers: {
          Authorization: `Token ${privateKey}`,
          'Scrimmage-Namespace': namespace,
        },
      },
    );
    return response.data;
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
  const namespace = Config.getNamespaceOrThrow();

  const response = await axios.get(`${serviceUrl}/integrations/users`, {
    headers: {
      Authorization: `Token ${privateKey}`,
      'Scrimmage-Namespace': namespace,
    },
  });
  return response.data;
};

const getUserToken = async (
  userId: string,
  options?: {
    tags?: string[],
    properties?: Record<string, any>,
  },
): Promise<string> => {
  options = options ?? {};
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');
  const namespace = Config.getNamespaceOrThrow();

  const response = await axios.post(
    `${serviceUrl}/integrations/users`,
    {
      id: userId,
      tags: options?.tags ?? [],
      properties: options?.properties ?? {},
    },
    {
      headers: {
        Authorization: `Token ${privateKey}`,
        'Scrimmage-Namespace': namespace,
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
  const namespace = Config.getNamespaceOrThrow();

  const response = await axios.get(
    `${Config.getServiceUrl('api')}/integrations/details`,
    {
      headers: {
        Authorization: `Token ${privateKey}`,
        'Scrimmage-Namespace': namespace,
      },
    },
  );
  return response.data;
};

interface ScrimmageAPI {
  createIntegrationReward<T extends Rewardable = Rewardable>(userId: string, dataType: string, reward?: T): Promise<IRewardableEventDTO>;

  createIntegrationReward<T extends Rewardable = Rewardable>(userId: string, dataType: string, uniqueId: string, reward?: T): Promise<IRewardableEventDTO>;

  getAllIntegrationUsers: typeof getAllIntegrationUsers;
  getUserToken: typeof getUserToken;
  getServiceStatus: typeof getServiceStatus;
  getOverallServiceStatus: typeof getOverallServiceStatus;
  getIntegrationDetails: typeof getIntegrationDetails;
}

const API: ScrimmageAPI = {
  createIntegrationReward,
  getAllIntegrationUsers,
  getUserToken,
  getServiceStatus,
  getOverallServiceStatus,
  getIntegrationDetails,
};

export default API;
