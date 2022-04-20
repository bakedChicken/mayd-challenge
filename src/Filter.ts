import { LogLevels } from "./LogLevels";
import { InputLogMessage } from "./types";

export interface Filter<T> {
  check: (value: T) => boolean;
}

export class LogMessageFilter implements Filter<InputLogMessage> {
  constructor(
    private readonly predicate: (value: InputLogMessage) => boolean
  ) {}

  check(value: InputLogMessage): boolean {
    return this.predicate(value);
  }
}

export class ErrorLogMessageFilter extends LogMessageFilter {
  constructor() {
    super((log) => log.logLevel === LogLevels.ERROR);
  }
}
