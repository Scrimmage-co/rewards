import { IRewardableEventDTO, Rewardable } from '@scrimmage/schemas';

export interface ScrimmageRewardsAPI {
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
}
