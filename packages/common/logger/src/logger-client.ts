import { LogLevel, Logger } from './logger';

export class LoggerClient {
  logger: Logger;
  source: string;
  sources: string[];

  constructor(logger: Logger, sources: string[]) {
    this.logger = logger;
    this.sources = sources;
    this.source = sources.join(', ');
  }

  createClient(sources: string[]) {
    return new LoggerClient(this.logger, [...this.sources, ...sources]);
  }

  log(message: string, logLevel = LogLevel.Info) {
    this.logger.log(message, this.source, logLevel);
  }

  debug(message: string) {
    this.logger.log(message, this.source, LogLevel.Debug);
  }

  warn(message: string) {
    this.logger.log(message, this.source, LogLevel.Warn);
  }

  error(message: string) {
    this.logger.log(message, this.source, LogLevel.Error);
  }
}
