import { injectable } from 'inversify';
import axios, { Axios } from 'axios';
import { RewarderConfig } from '../types/RewarderConfig';
import { ScrimmageAPIService } from '../types/ScrimmageAPIServices';
import { PrivateKey } from '../types/PrivateKey';

export interface InternalRewarderConfig extends RewarderConfig {
  services: Record<ScrimmageAPIService, string>;
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

@injectable()
export class ConfigService {
  private rewarderConfig: InternalRewarderConfig;

  setConfig(config: RewarderConfig) {
    const { apiServerEndpoint, ...rest } = config;
    if (!apiServerEndpoint) {
      throw new Error('apiServerEndpoint is required');
    }
    this.validateProtocol(apiServerEndpoint, config.secure);
    const apiEndpoint = apiServerEndpoint.endsWith('/')
      ? apiServerEndpoint.slice(0, -1)
      : apiServerEndpoint;

    this.rewarderConfig = {
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
  }

  isConfigured(): boolean {
    return Boolean(this.rewarderConfig);
  }

  getConfigOrThrow(): InternalRewarderConfig {
    if (this.isConfigured()) {
      return this.rewarderConfig;
    } else {
      throw new Error('Rewarder not initiated');
    }
  }

  getPrivateKeyOrThrow(alias = 'default'): string {
    const config = this.getConfigOrThrow();
    const privateKey = config.privateKeys.find((key) => key.alias === alias);

    if (!privateKey) {
      throw new Error(`Private key with alias [${alias}] not found`);
    }

    return privateKey.value;
  }

  getServiceUrl(service: ScrimmageAPIService): string {
    const config = this.getConfigOrThrow();

    return `${config.apiServerEndpoint}/${service}`;
  }

  getNamespaceOrThrow(): string {
    const config = this.getConfigOrThrow();

    return config.namespace;
  }

  getHttpClientOrThrow(): Axios {
    const config = this.getConfigOrThrow();

    return config.httpClient;
  }

  validateProtocol(url: string, secure: boolean) {
    const protocolRegex = secure ? /^https:\/\/.+/ : /^https?:\/\/.+/;
    if (!protocolRegex.test(url)) {
      throw new Error(
        `Service URL must start with http${secure ? 's' : ''}://`,
      );
    }
  }
}
