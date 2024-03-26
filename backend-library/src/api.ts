import Config, { RewardService, RewardServices } from './config';
import { HttpStatusCode } from 'axios';
import { AccountNotLinkedException } from './exceptions/AccountNotLinked.exception';
import {
  IIntegrationUserDTO,
  IRewardableEventDTO,
  Rewardable,
} from '@scrimmage/schemas';

const createIntegrationReward: ScrimmageAPI['createIntegrationReward'] = async <
  T extends Rewardable = Rewardable,
>(
  userId: string,
  dataType: string,
  eventIdOrReward: string | T,
  reward?: T,
): Promise<IRewardableEventDTO> => {
  const eventId =
    typeof eventIdOrReward === 'string' ? eventIdOrReward : undefined;
  const rewardable =
    typeof eventIdOrReward === 'string' ? reward : eventIdOrReward;
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');
  const namespace = Config.getNamespaceOrThrow();
  const httpClient = Config.getHttpClientOrThrow();

  try {
    const response = await httpClient.post<IRewardableEventDTO>(
      `${serviceUrl}/integrations/rewards`,
      {
        eventId,
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

const getUserToken = async (
  userId: string,
  options?: {
    tags?: string[];
    properties?: Record<string, any>;
  },
): Promise<string> => {
  options = options ?? {};
  const privateKey = Config.getPrivateKeyOrThrow();
  const serviceUrl = Config.getServiceUrl('api');
  const namespace = Config.getNamespaceOrThrow();
  const httpClient = Config.getHttpClientOrThrow();

  const response = await httpClient.post(
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
  const httpClient = Config.getHttpClientOrThrow();
  const response = await httpClient.get(
    `${Config.getServiceUrl(service)}/system/status`,
  );
  return response.data;
};

const getOverallServiceStatus = async (): Promise<any> => {
  const result = await Promise.allSettled(
    RewardServices.map((service) => getServiceStatus(service)),
  );
  return result.every((r) => r.status === 'fulfilled');
};

const getRewarderKeyDetails = async (): Promise<any> => {
  const privateKey = Config.getPrivateKeyOrThrow();
  const namespace = Config.getNamespaceOrThrow();
  const httpClient = Config.getHttpClientOrThrow();

  const response = await httpClient.get(
    `${Config.getServiceUrl('api')}/rewarders/keys/@me`,
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
  createIntegrationReward<T extends Rewardable = Rewardable>(
    userId: string,
    dataType: string,
    reward?: T,
  ): Promise<IRewardableEventDTO>;

  createIntegrationReward<T extends Rewardable = Rewardable>(
    userId: string,
    dataType: string,
    uniqueId: string,
    reward?: T,
  ): Promise<IRewardableEventDTO>;

  getUserToken: typeof getUserToken;
  getServiceStatus: typeof getServiceStatus;
  getOverallServiceStatus: typeof getOverallServiceStatus;
  getRewarderKeyDetails: typeof getRewarderKeyDetails;
}

const API: ScrimmageAPI = {
  createIntegrationReward,
  getUserToken,
  getServiceStatus,
  getOverallServiceStatus,
  getRewarderKeyDetails,
};

export default API;
