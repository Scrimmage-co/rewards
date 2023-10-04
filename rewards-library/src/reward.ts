import API from './api';
import { IRewardableEventDTO, Rewardable } from '@scrimmage/schemas';

const trackRewardable = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  ...rewards: T[]
): Promise<IRewardableEventDTO[]> => {
  const results = [];
  for (const reward of rewards) {
    results.push(await API.createIntegrationReward(userId, dataType, reward));
  }
  return results;
};

const trackRewardableOnce = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  uniqueId: string,
  reward: T
): Promise<IRewardableEventDTO> => {
  return API.createIntegrationReward(userId, dataType, uniqueId, reward);
}

const Reward = {
  trackRewardable,
  trackRewardableOnce,
};

export default Reward;
