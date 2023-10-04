import API from './api';
import { Rewardable } from '@scrimmage/schemas';

const trackRewardable = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  ...rewards: T[]
) => {
  for (const reward of rewards) {
    await API.createIntegrationReward(userId, dataType, reward);
  }
};

const trackRewardableOnce = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  uniqueId: string,
  reward: T
) => {
  await API.createIntegrationReward(userId, dataType, uniqueId, reward);
}

const Reward = {
  trackRewardable,
  trackRewardableOnce,
};

export default Reward;
