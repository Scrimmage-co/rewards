export type LogLevel = 'log' | 'warn' | 'debug' | 'info' | 'error';

const logger: Record<LogLevel, typeof console.log> = {
  log: (...args) => console.log(args),
  warn: (...args) => console.warn(args),
  debug: (...args) => console.debug(args),
  info: (...args) => console.info(args),
  error: (...args) => console.error(args),
}

export default logger;
