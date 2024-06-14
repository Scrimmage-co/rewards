import { inject, injectable } from 'inversify';
import { ScrimmageRewardsAPI } from '../types/ScrimmageRewardsAPI';
import { IRewardableEventDTO, Rewardable } from '@scrimmage/schemas';
import { HttpStatusCode } from 'axios';
import { AccountNotLinkedException } from '../exceptions/AccountNotLinked.exception';
import { InvalidPrivateKeyException } from '../exceptions/InvalidPrivateKey.exception';
import { ConfigService } from './Config.service';
import {
  ScrimmageAPIService,
  ScrimmageAPIServices,
} from '../types/ScrimmageAPIServices';

@injectable()
export class APIService implements ScrimmageRewardsAPI {
  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  async createIntegrationReward<T extends Rewardable = Rewardable>(
    userId: string,
    dataType: string,
    eventIdOrReward: string | T,
    reward?: T,
  ): Promise<IRewardableEventDTO> {
    const eventId =
      typeof eventIdOrReward === 'string' ? eventIdOrReward : undefined;
    const rewardable =
      typeof eventIdOrReward === 'string' ? reward : eventIdOrReward;
    const privateKey = this.config.getPrivateKeyOrThrow();
    const serviceUrl = this.config.getServiceUrl('api');
    const namespace = this.config.getNamespaceOrThrow();
    const httpClient = this.config.getHttpClientOrThrow();

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
      if (
        error.response?.status === HttpStatusCode.Unauthorized ||
        error.response?.status === HttpStatusCode.Forbidden
      ) {
        return Promise.reject(new InvalidPrivateKeyException());
      }
      return Promise.reject(error);
    }
  }

  async getUserToken(
    userId: string,
    options?: {
      tags?: string[];
      properties?: Record<string, any>;
    },
  ): Promise<string> {
    options = options ?? {};
    const privateKey = this.config.getPrivateKeyOrThrow();
    const serviceUrl = this.config.getServiceUrl('api');
    const namespace = this.config.getNamespaceOrThrow();
    const httpClient = this.config.getHttpClientOrThrow();

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
  }

  async getServiceStatus(service: ScrimmageAPIService): Promise<any> {
    const httpClient = this.config.getHttpClientOrThrow();
    const response = await httpClient.get(
      `${this.config.getServiceUrl(service)}/system/status`,
    );
    return response.data;
  }

  async getOverallServiceStatus(): Promise<any> {
    const result = await Promise.allSettled(
      ScrimmageAPIServices.map((service) => this.getServiceStatus(service)),
    );
    return result.every((r) => r.status === 'fulfilled');
  }

  async getRewarderKeyDetails(): Promise<any> {
    const privateKey = this.config.getPrivateKeyOrThrow();
    const namespace = this.config.getNamespaceOrThrow();
    const httpClient = this.config.getHttpClientOrThrow();

    const response = await httpClient.get(
      `${this.config.getServiceUrl('api')}/rewarders/keys/@me`,
      {
        headers: {
          Authorization: `Token ${privateKey}`,
          'Scrimmage-Namespace': namespace,
        },
      },
    );
    return response.data;
  }

  async updateRewardableProperty(
    namespace: string,
    dataType: string,
    key: string,
    value: any,
  ): Promise<any> {
    const privateKey = this.config.getPrivateKeyOrThrow();
    const serviceUrl = this.config.getServiceUrl('api');
    const httpClient = this.config.getHttpClientOrThrow();
    console.log(
      'updateRewardableProperty',
      `${serviceUrl}/rewardable-properties/${dataType}${key}`,
      value,
    );
    const response = await httpClient.put(
      `${serviceUrl}/rewardable-properties/${dataType}${key}`,
      {
        value,
      },
      {
        headers: {
          Authorization: `Token ${privateKey}`,
          'Scrimmage-Namespace': namespace,
        },
      },
    );
    return response.data;
  }
}
