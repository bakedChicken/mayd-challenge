import { assertStringIsLogLevel, UnknownLogLevelError } from "./LogLevels";

describe("LogLevels enum", () => {
  describe("assertStringIsLogLevel", () => {
    it("should do nothing if string is LogLevel", () => {
      expect(() => assertStringIsLogLevel("info")).not.toThrow();
    });

    it("should throw if string is not LogLevel", () => {
      expect(() => assertStringIsLogLevel("somevalue")).toThrow(
        UnknownLogLevelError
      );
    });
  });
});
