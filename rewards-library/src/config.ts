import { LogLevel } from './logger';

export interface RewarderConfig {
  privateKey: string;
  sandbox?: boolean;
  logLevel?: LogLevel;
}

export interface InternalRewarderConfig extends RewarderConfig {
  baseUrl: string;
  loginUrl: string;
  imgUrl: string;
}

/**
 * Everything new in {@link InternalRewarderConfig} as is and everything
 * as optional from {@link RewarderConfig}
 */
type DefaultRewarderConfig = Omit<
  InternalRewarderConfig,
  keyof RewarderConfig
> &
  Partial<RewarderConfig>;

const defaultRewarderConfig: DefaultRewarderConfig = {
  sandbox: false,
  logLevel: 'debug',
  // Generated on AppsFlier dashboard
  loginUrl: `https://scrimmage.onelink.me/1BGM?af_web_dp=https%3A%2F%2Frewards.scrimmage.co&af_xp=app&pid=lib_rewards&c=direct_integration`,
  baseUrl: 'https://app.scrimmage.co/api',
  imgUrl: 'https://app.scrimmage.co/img',
};

let rewarderConfig: InternalRewarderConfig;

const setConfig = (config: RewarderConfig) => {
  rewarderConfig = {
    ...defaultRewarderConfig,
    ...config,
  };
};

const isConfigured = (): boolean => {
  return Boolean(rewarderConfig);
};

const getConfigOrThrow = (): InternalRewarderConfig => {
  if (isConfigured()) {
    return rewarderConfig;
  } else {
    throw new Error('Rewarder not initiated');
  }
};

const Config = {
  setConfig,
  getConfigOrThrow,
  isConfigured,
};

export default Config;
