import { LogLevel } from './logger';

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
  sandbox?: boolean;
  logLevel?: LogLevel;
  logger?: Logger;
}

export interface InternalRewarderConfig extends RewarderConfig {
  services: {
    api: string;
    p2e: string;
    fed: string;
  };
  privateKeys?: PrivateKey[];
  apiServerProtocol: string;
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
  services: {
    api: 'api',
    p2e: 'p2e',
    fed: 'fed',
  },
  apiServerProtocol: 'https',
  logger: console,
};

let rewarderConfig: InternalRewarderConfig;

const setConfig = (config: RewarderConfig) => {
  const { apiServerEndpoint, ...rest } = config;
  if (!apiServerEndpoint) {
    throw new Error('apiServerEndpoint is required');
  }
  if (!apiServerEndpoint.startsWith('https://')) {
    throw new Error('apiServerEndpoint must start with https://');
  }
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

const getServiceUrl = (
  service: keyof DefaultRewarderConfig['services'],
): string => {
  const config = getConfigOrThrow();

  return `${config.apiServerEndpoint}/${service}`;
};

const Config = {
  setConfig,
  getConfigOrThrow,
  isConfigured,
  getPrivateKeyOrThrow,
  getServiceUrl,
};

export default Config;
