import { RewarderConfig } from './config';
declare const Scrimmage: {
    initRewarder: (config: RewarderConfig) => void;
    user: {
        getAll: () => Promise<never>;
        getOne: () => Promise<never>;
        generateLoginLink: (userId: string) => string;
    };
    reward: {
        trackRewardable: (...rewardable: import(".").Rewardable[]) => Promise<void>;
    };
};
export default Scrimmage;
