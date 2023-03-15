import { LogLevel } from './logger';

export interface RewarderConfig {
  rewarderId: number;
  privateKey: string;
  sandbox?: boolean;
  logLevel?: LogLevel;
}

export interface InternalRewarderConfig extends RewarderConfig {
  baseUrl?: string;
  loginUrl?: string;
}

const defaultRewarderConfig: Partial<InternalRewarderConfig> = {
  sandbox: false,
  logLevel: 'debug',
  // Generated on AppsFlier dashboard
  loginUrl: `https://scrimmage.onelink.me/1BGM?af_web_dp=https%3A%2F%2Frewards.scrimmage.co&af_xp=app&pid=Cross_sale&c=Direct%20Integration`,
  baseUrl: 'https://app.scrimmage.co/api',
};

let rewarderConfig: InternalRewarderConfig;

const setConfig = (config: RewarderConfig) => {
  rewarderConfig = {
    ...defaultRewarderConfig,
    ...config,
  };
}

const isConfigured = (): boolean => {
  return !rewarderConfig;
}

const getConfigOrThrow = (): InternalRewarderConfig => {
  if (isConfigured()) {
    return rewarderConfig;
  } else {
    throw new Error('Rewarder not initiated');
  }
}

const Config = {
  setConfig,
  getConfigOrThrow,
  isConfigured,
}

export default Config;
