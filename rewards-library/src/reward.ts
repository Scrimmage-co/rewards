import API from './api';
import { Rewardable } from '@scrimmage/schemas';

const trackRewardable = async <T extends Rewardable = Rewardable>(
  ...rewardable: T[]
) => {
  for (const reward of rewardable) {
    await API.createIntegrationReward(reward);
  }
};

const Reward = {
  trackRewardable,
};

export default Reward;
