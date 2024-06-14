import { inject, injectable } from 'inversify';
import { IRewardableEventDTO, Rewardable } from '@scrimmage/schemas';
import { APIService } from './API.service';

@injectable()
export class RewardService {
  constructor(
    @inject(APIService)
    private readonly API: APIService,
  ) {}

  async trackRewardable<T extends Rewardable = Rewardable>(
    userId: string,
    dataType: string,
    ...rewards: T[]
  ): Promise<IRewardableEventDTO[]> {
    const results = [];
    for (const reward of rewards) {
      results.push(
        await this.API.createIntegrationReward(userId, dataType, reward),
      );
    }
    return results;
  }

  async aggregateEvent(userId: string, statistics: Record<string, any>) {
    for (const [dataType, stats] of Object.entries(statistics)) {
      for (const [key, value] of Object.entries(stats)) {
        await this.API.updateRewardableProperty(userId, dataType, key, value);
      }
    }
  }

  async trackRewardableOnce<T extends Rewardable = Rewardable>(
    userId: string,
    dataType: string,
    uniqueId: string,
    reward: T,
  ): Promise<IRewardableEventDTO> {
    return this.API.createIntegrationReward(userId, dataType, uniqueId, reward);
  }
}
