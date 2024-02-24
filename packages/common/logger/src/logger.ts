import { LoggerClient } from './logger-client';

export enum LogLevel {
  Debug = 'Debug',
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error',
}

const LOG_LEVEL_ORDER = {
  [LogLevel.Debug]: 0,
  [LogLevel.Info]: 1,
  [LogLevel.Warn]: 2,
  [LogLevel.Error]: 3,
} as const;

const LOG_LEVEL_STYLES = {
  [LogLevel.Debug]: ['color: #666', 'background-color: #fff'].join(';'),
  [LogLevel.Info]: ['color: #386da5', 'background-color: #fff'].join(';'),
  [LogLevel.Warn]: ['color: #efd61a', 'background-color: #fff'].join(';'),
  [LogLevel.Error]: ['color: #ef1a41', 'background-color: #fff'].join(';'),
} as const;

function shouldLog(minLogLevel: LogLevel | undefined | null, logLevel: LogLevel) {
  if (minLogLevel === undefined) {
    return true;
  }

  if (minLogLevel === null) {
    return false;
  }

  return LOG_LEVEL_ORDER[minLogLevel] >= LOG_LEVEL_ORDER[logLevel];
}

type LoggerFilters = Record<string, LogLevel | null>;

const LOG_SOURCE_STYLE = [
  'color: #333',
  'background-color: #eee',
  'padding: 2px',
  'border-radius: 3px',
  'font-weight: 600',
].join(';');

const LOG_BASE_STYLE = ['color: #333', 'background-color: #fff'].join(';');

export class Logger {
  filters: LoggerFilters;

  constructor() {
    this.filters = {};
  }

  setFilterLevel(source: string, level: LogLevel | null) {
    this.filters[source] = level;
  }

  log(message: string, source = 'Unknown', logLevel = LogLevel.Info) {
    if (shouldLog(this.filters[source], logLevel)) {
      console.log(`%c[${source}]%c %c${message}`, LOG_SOURCE_STYLE, LOG_BASE_STYLE, LOG_LEVEL_STYLES[logLevel]);
    }
  }

  createClient(sources: string[]): LoggerClient {
    return new LoggerClient(this, sources);
  }
}
