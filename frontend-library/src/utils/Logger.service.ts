import { injectable } from 'inversify';

export type LogLevel = 'log' | 'error';

@injectable()
export class LoggerService {
  public log(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  public error(message: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
  }
}
