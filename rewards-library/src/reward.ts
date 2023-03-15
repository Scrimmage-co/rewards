import { Rewardable } from './types/Rewardables';
import Config from './config';
import axios from 'axios';

export const trackRewardable = async (...rewardable: Rewardable[]) => {
  const config = Config.getConfigOrThrow();
  for (let reward of rewardable) {
    await axios.post(
      `${config.baseUrl}/integrations/rewards`,
      {
        rewardable: reward,
      },
      {
        headers: {
          Authorization: `Token ${config.privateKey}`,
        }
      },
    );
  }
}

export const getProfile = async () => {
  throw new Error('Not implemented');
}

export const getUsers = async () => {

}
