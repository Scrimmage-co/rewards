import { Axios } from 'axios';
import { LogLevel } from './LogLevel';
import { ILogger } from './ILogger';

export interface RewarderConfig {
  apiServerEndpoint: string;
  privateKey: string;
  namespace: string;
  logLevel?: LogLevel;
  logger?: ILogger;
  secure?: boolean;
  validateApiServerEndpoint?: boolean;
  httpClient?: Axios;
}
