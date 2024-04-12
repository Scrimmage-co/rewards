import { inject, injectable } from 'inversify';
import { LogLevel } from '../types/LogLevel';
import { ILogger } from '../types/ILogger';
import { ConfigService } from './Config.service';

const logLevelOrder: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  log: 2,
  warn: 3,
  error: 4,
};

@injectable()
export class LoggerService implements ILogger {
  constructor(
    @inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
  }

  log(...args: any[]) {
    const config = this.configService.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.log) {
      config.logger.log(...args);
    }
  }

  warn(...args: any[]) {
    const config = this.configService.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.warn) {
      config.logger.warn(...args);
    }
  }

  debug(...args: any[]) {
    const config = this.configService.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.debug) {
      config.logger.debug(...args);
    }
  }

  info(...args: any[]) {
    const config = this.configService.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.info) {
      config.logger.info(...args);
    }
  }

  error(...args: any[]) {
    const config = this.configService.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.error) {
      config.logger.error(...args);
    }
  }
}
