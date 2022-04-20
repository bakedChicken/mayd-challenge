export enum LogLevels {
  INFO = "info",
  DEBUG = "debug",
  WARN = "warn",
  ERROR = "error",
}

export class UnknownLogLevelError extends Error {
  constructor(readonly supposedLogLevel: string) {
    super(`The log message has unknown log level: ${supposedLogLevel}`);
  }
}

export function assertStringIsLogLevel(
  value: string
): asserts value is keyof typeof LogLevels {
  if (!Object.values<string>(LogLevels).includes(value)) {
    throw new UnknownLogLevelError(value);
  }
}
