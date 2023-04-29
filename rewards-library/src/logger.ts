import Config from './config';

export type LogLevel = 'log' | 'warn' | 'debug' | 'info' | 'error';

const logLevelOrder: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  log: 2,
  warn: 3,
  error: 4,
};

const logger: Record<LogLevel, typeof console.log> = {
  log: (...args) => {
    const config = Config.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.log) {
      config.logger.log(...args);
    }
  },
  warn: (...args) => {
    const config = Config.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.warn) {
      config.logger.warn(...args);
    }
  },
  debug: (...args) => {
    const config = Config.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.debug) {
      config.logger.debug(...args);
    }
  },
  info: (...args) => {
    const config = Config.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.info) {
      config.logger.info(...args);
    }
  },
  error: (...args) => {
    const config = Config.getConfigOrThrow();
    if (logLevelOrder[config.logLevel] <= logLevelOrder.error) {
      config.logger.error(...args);
    }
  },
};

export default logger;
