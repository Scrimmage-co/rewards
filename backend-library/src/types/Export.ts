import { RewarderConfig } from './RewarderConfig';
import { createScrimmageInstance } from '../create';

export interface GlobalMethods{
  initRewarder: (config: RewarderConfig) => Promise<void>;

  createRewarder: typeof createScrimmageInstance;
}
