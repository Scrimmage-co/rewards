import { LogLevel } from './logger';
import axios, { Axios } from 'axios';

export interface PrivateKey {
  /**
   * Alias for the private key. Used to identify the private key when
   * sending rewards.
   */
  alias: string;
  /**
   * Private key used to send rewards.
   */
  value: string;
}

export interface Logger {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export interface RewarderConfig {
  apiServerEndpoint: string;
  privateKey: string;
  namespace: string;
  logLevel?: LogLevel;
  logger?: Logger;
  secure?: boolean;
  validateApiServerEndpoint?: boolean;
  httpClient?: Axios;
}

export const RewardServices = ['api', 'p2e', 'fed', 'nbc'] as const;

export type RewardService = (typeof RewardServices)[number];

export interface InternalRewarderConfig extends RewarderConfig {
  services: Record<RewardService, string>;
  privateKeys?: PrivateKey[];
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
  logLevel: 'debug',
  services: {
    api: 'api',
    p2e: 'p2e',
    fed: 'fed',
    nbc: 'nbc',
  },
  logger: console,
  httpClient: axios,
  secure: true,
  validateApiServerEndpoint: true,
};

let rewarderConfig: InternalRewarderConfig;

const setConfig = (config: RewarderConfig) => {
  const { apiServerEndpoint, ...rest } = config;
  if (!apiServerEndpoint) {
    throw new Error('apiServerEndpoint is required');
  }
  validateProtocol(apiServerEndpoint, config.secure);
  const apiEndpoint = apiServerEndpoint.endsWith('/')
    ? apiServerEndpoint.slice(0, -1)
    : apiServerEndpoint;

  rewarderConfig = {
    ...defaultRewarderConfig,
    ...rest,
    apiServerEndpoint: apiEndpoint,
    privateKeys: [
      {
        alias: 'default',
        value: config.privateKey,
      },
    ],
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

const getPrivateKeyOrThrow = (alias = 'default'): string => {
  const config = getConfigOrThrow();
  const privateKey = config.privateKeys.find((key) => key.alias === alias);

  if (!privateKey) {
    throw new Error(`Private key with alias [${alias}] not found`);
  }

  return privateKey.value;
};

const getServiceUrl = (service: RewardService): string => {
  const config = getConfigOrThrow();

  return `${config.apiServerEndpoint}/${service}`;
};

const validateProtocol = (url: string, secure: boolean) => {
  const protocolRegex = secure ? /^https:\/\/.+/ : /^https?:\/\/.+/;
  if (!protocolRegex.test(url)) {
    throw new Error(`Service URL must start with http${secure ? 's' : ''}://`);
  }
};

const getNamespaceOrThrow = (): string => {
  const config = getConfigOrThrow();

  return config.namespace;
};

const getHttpClientOrThrow = (): Axios => {
  const config = getConfigOrThrow();

  return config.httpClient;
};

const Config = {
  setConfig,
  getConfigOrThrow,
  isConfigured,
  getPrivateKeyOrThrow,
  getServiceUrl,
  getNamespaceOrThrow,
  getHttpClientOrThrow,
};

export default Config;
