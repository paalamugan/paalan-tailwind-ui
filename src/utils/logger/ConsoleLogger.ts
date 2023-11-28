import type { ILogger, LogLevel, LogParams } from './ILogger';

export class ConsoleLogger implements ILogger {
  static methodMap: Record<LogLevel, typeof console.log> = {
    DEBUG: console.debug,
    ERROR: console.error,
    INFO: console.info,
    WARN: console.warn,
  };

  log(level: LogLevel, message: string, params?: LogParams) {
    ConsoleLogger.methodMap[level](`${level.toUpperCase()}: ${message}`, params ?? '');
  }

  debug(message: string, params?: LogParams) {
    console.debug(`DEBUG: ${message}`, params ?? '');
  }

  info(message: string, params?: LogParams) {
    console.info(`INFO: ${message}`, params ?? '');
  }

  warn(message: string, params?: LogParams) {
    console.warn(`WARN: ${message}`, params ?? '');
  }

  error(message: string, params?: LogParams) {
    console.error(`ERROR: ${message}`, params ?? '');
  }
}
