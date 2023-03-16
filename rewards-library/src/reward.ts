import { Rewardable } from './types/Rewardables';
import Config from './config';
import axios from 'axios';

const trackRewardable = async (...rewardable: Rewardable[]) => {
  const config = Config.getConfigOrThrow();
  for (const reward of rewardable) {
    await axios.post(
      `${config.baseUrl}/integrations/rewards`,
      {
        rewardable: reward,
      },
      {
        headers: {
          Authorization: `Token ${config.privateKey}`,
        },
      },
    );
  }
};

const Reward = {
  trackRewardable,
};

export default Reward;
