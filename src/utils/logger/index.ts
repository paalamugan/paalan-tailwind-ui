import type { ILogger } from './ILogger';

import { ConsoleLogger } from './ConsoleLogger';
import { LogEnvironment } from './ILogger';
import { MockLogger } from './MockLogger';

// TODO: ProdConsoleLogger
// TODO: MockLogger
const ProdConsoleLogger = ConsoleLogger;

const loggers = {
  [LogEnvironment.Dev]: ConsoleLogger,
  [LogEnvironment.Prod]: ProdConsoleLogger,
  [LogEnvironment.Test]: MockLogger,
};

class Logger {
  private _client: ILogger | undefined;

  constructor() {
    this.init();
  }

  log(...args: Parameters<ILogger['log']>) {
    this.getClient().log(...args);
  }

  debug(...args: Parameters<ILogger['debug']>) {
    this.getClient().debug(...args);
  }

  info(...args: Parameters<ILogger['info']>) {
    this.getClient().info(...args);
  }

  warn(...args: Parameters<ILogger['warn']>) {
    this.getClient().warn(...args);
  }

  error(...args: Parameters<ILogger['error']>) {
    this.getClient().error(...args);
  }

  private getClient(): ILogger {
    if (!this._client) {
      this.init();
    }

    return this._client!;
  }

  private init() {
    if (this._client === undefined) {
      if (import.meta.env.TEST) {
        console.debug('Mock logger was initiated');
        return (this._client = new loggers[LogEnvironment.Test]());
      }

      if (import.meta.env.DEV) {
        console.debug('Development logger was initiated');
        return (this._client = new loggers[LogEnvironment.Dev]());
      }

      this._client = new loggers[LogEnvironment.Prod]();
    }
  }
}

export const logger = new Logger();
