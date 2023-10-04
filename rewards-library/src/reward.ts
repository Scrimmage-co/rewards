import API from './api';
import { Rewardable } from '@scrimmage/schemas';

const trackRewardable = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  ...rewardable: T[]
) => {
  for (const reward of rewardable) {
    await API.createIntegrationReward(userId, dataType, reward);
  }
};

const trackRewardableWithUniqueId = async <T extends Rewardable = Rewardable>(
  userId: string,
  dataType: string,
  uniqueId: string,
  ...rewardable: T[]
) => {
  for (const reward of rewardable) {
    await API.createIntegrationReward(userId, dataType, uniqueId, reward);
  }
}

const Reward = {
  trackRewardable,
  trackRewardableWithUniqueId,
};

export default Reward;
