import { Rewardable } from './types/Rewardables';
import API from './api';

const trackRewardable = async <T extends Rewardable = Rewardable>(
  privateKeyAlias: string,
  ...rewardable: T[]
) => {
  for (const reward of rewardable) {
    await API.createIntegrationReward(privateKeyAlias, reward);
  }
};

const Reward = {
  trackRewardable,
};

export default Reward;
