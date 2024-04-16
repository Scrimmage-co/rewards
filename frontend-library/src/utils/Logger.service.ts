import { inject, injectable } from 'inversify';
import { LogLevel } from '../types/LogLevel';
import { CONFIG_INJECT_KEY } from '../config';
import { InitOptions } from '../types/InitOptions';
import { ILogger } from '../types/ILogger';

const logLevelOrder: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  log: 2,
  warn: 3,
  error: 4,
};

@injectable()
export class LoggerService {
  private readonly logLevel: LogLevel;
  private logger: ILogger;

  constructor(
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
  ) {
    this.logLevel = options.logLevel ?? 'log';
    this.logger = options.logger ?? console;
  }

  debug(...args: any[]) {
    if (logLevelOrder[this.logLevel] <= logLevelOrder.debug) {
      this.logger.debug(...args);
    }
  }

  info(...args: any[]) {
    if (logLevelOrder[this.logLevel] <= logLevelOrder.info) {
      this.logger.info(...args);
    }
  }

  log(...args: any[]) {
    if (logLevelOrder[this.logLevel] <= logLevelOrder.log) {
      this.logger.log(...args);
    }
  }

  warn(...args: any[]) {
    if (logLevelOrder[this.logLevel] <= logLevelOrder.warn) {
      this.logger.warn(...args);
    }
  }

  error(...args: any[]) {
    if (logLevelOrder[this.logLevel] <= logLevelOrder.error) {
      this.logger.error(...args);
    }
  }
}
