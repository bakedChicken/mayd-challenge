import { LogLevels, assertStringIsLogLevel } from "./LogLevels";
import { InputLogMessage } from "./types";

export type ParserSuccessResult<T> = {
  result: "ok";
  message: T;
};

export type ParserErrorResult = {
  result: "error";
  error: Error;
};

export type ParserResult<T> = ParserSuccessResult<T> | ParserErrorResult;

export interface Parser<T> {
  parse: (line: string) => ParserResult<T>;
}

export class MalformedLogMessageError extends Error {
  constructor(readonly raw: string) {
    super(`The log message has malformed format:\n${raw}`);
  }
}

export class LogMessageFormatParser implements Parser<InputLogMessage> {
  parse(line: string): ParserResult<InputLogMessage> {
    try {
      const splittedLine = line.split(" - ");

      if (splittedLine.length !== 3) {
        return {
          result: "error",
          error: new MalformedLogMessageError(line),
        };
      }

      const [date, logLevel, message] = splittedLine;
      assertStringIsLogLevel(logLevel);

      return {
        result: "ok",
        message: {
          loggedAt: new Date(date),
          logLevel: logLevel as LogLevels,
          message: JSON.parse(message),
        },
      };
    } catch (error: unknown) {
      return {
        result: "error",
        error: error as Error,
      };
    }
  }
}
