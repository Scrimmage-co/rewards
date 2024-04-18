import { LogLevel } from './LogLevel';
import { ILogger } from './ILogger';

export interface InitOptions {
  apiServerEndpoint: string;
  refreshToken: () => Promise<string>;
  onReady?: () => void;
  logLevel?: LogLevel;
  logger?: ILogger;
}
