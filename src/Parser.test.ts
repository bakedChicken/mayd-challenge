import { LogLevels, UnknownLogLevelError } from "./LogLevels";
import {
  LogMessageFormatParser,
  MalformedLogMessageError,
  ParserErrorResult,
  ParserResult,
} from "./Parser";
import { InputLogMessage } from "./types";

describe("Parser", () => {
  describe("LogMessageFormatParser", () => {
    const parser = new LogMessageFormatParser();

    it("should successfully parse log message", () => {
      const logMessage = `2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}`;
      const result: ParserResult<InputLogMessage> = {
        result: "ok",
        message: {
          loggedAt: new Date("2021-08-09T02:12:51.257Z"),
          logLevel: LogLevels.DEBUG,
          message: {
            transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
            details: "User information is gathered",
            user: { id: 10, name: "Alice" },
          },
        },
      };

      expect(parser.parse(logMessage)).toMatchObject<
        ParserResult<InputLogMessage>
      >(result);
    });

    it("should return error if log message has invalid format", () => {
      const logMessage = `2021-08-09T02:12:51.257Z - debug`;
      const result = parser.parse(logMessage);

      expect(result.result).toBe("error");
      expect((result as ParserErrorResult).error).toBeInstanceOf(
        MalformedLogMessageError
      );
    });

    it("should return error if log message has invalid LogLevel", () => {
      const logMessage = `2021-08-09T02:12:51.257Z - somevalue - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978"}`;
      const result = parser.parse(logMessage);

      expect(result.result).toBe("error");
      expect((result as ParserErrorResult).error).toBeInstanceOf(
        UnknownLogLevelError
      );
    });
  });
});
