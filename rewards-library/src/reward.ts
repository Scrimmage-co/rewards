import { Rewardable } from './types/Rewardables';
import API from './api';

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
