import { ErrorLogMessageFilter, LogMessageFilter } from "./Filter";
import { LogLevels } from "./LogLevels";

describe("Filter", () => {
  describe("LogMessageFilter", () => {
    it("should check based on predicate", () => {
      const filter = new LogMessageFilter(
        (log) => log.logLevel === LogLevels.DEBUG
      );

      expect(
        filter.check({
          loggedAt: new Date("2021-08-09T02:12:51.257Z"),
          logLevel: LogLevels.DEBUG,
          message: {
            transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
          },
        })
      ).toBe(true);

      expect(
        filter.check({
          loggedAt: new Date("2021-08-09T02:12:51.257Z"),
          logLevel: LogLevels.INFO,
          message: {
            transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
          },
        })
      ).toBe(false);
    });
  });

  describe("ErrorLogMessageFilter", () => {
    const filter = new ErrorLogMessageFilter();

    it("should filter out only error log messages", () => {
      expect(
        filter.check({
          loggedAt: new Date("2021-08-09T02:12:51.257Z"),
          logLevel: LogLevels.INFO,
          message: {
            transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
          },
        })
      ).toBe(false);

      expect(
        filter.check({
          loggedAt: new Date("2021-08-09T02:12:51.257Z"),
          logLevel: LogLevels.ERROR,
          message: {
            transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
          },
        })
      ).toBe(true);
    });
  });
});
