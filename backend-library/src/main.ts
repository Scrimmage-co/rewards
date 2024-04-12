import 'reflect-metadata';
import { RewarderConfig } from './types/RewarderConfig';
import { createScrimmageInstance, ScrimmageInstance } from './create';
import { GlobalMethods } from './types/Export';

const Scrimmage: ScrimmageInstance & GlobalMethods = {
  _container: null,
  user: null,
  reward: null,
  initRewarder: null,
  createRewarder: createScrimmageInstance,
};

Scrimmage.initRewarder = async (config: RewarderConfig) => {
  const rewarder = await createScrimmageInstance(config);

  // Hack to make the rewarder object global
  Scrimmage._container = rewarder._container;
  Scrimmage.user = rewarder.user;
  Scrimmage.reward = rewarder.reward;
};
Scrimmage.createRewarder = createScrimmageInstance;

export default Scrimmage;
