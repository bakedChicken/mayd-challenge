import { LogLevels } from "./LogLevels";
import {
  composeTransformers,
  InputLogMessageToOutputLogMessageTransformer,
  OutputLogMessageToStringTransformer,
  Transformer,
} from "./Transformer";
import { OutputLogMessage } from "./types";

describe("Transformer", () => {
  describe("composeTransformers", () => {
    it("should call each transformer sequencially", () => {
      const transformerPlus1: Transformer<number, number> = {
        transform: (value: number): number => {
          return value + 1;
        },
      };

      const transformerToString: Transformer<number, string> = {
        transform: (value: number): string => {
          return value.toString();
        },
      };

      const resultTransformer = composeTransformers(
        transformerPlus1,
        transformerToString
      );

      expect(resultTransformer.transform(1)).toBe("2");
    });
  });

  describe("InputLogMessageToOutputLogMessageTransformer", () => {
    it("should transform input log message object to output log message object", () => {
      const transformer = new InputLogMessageToOutputLogMessageTransformer();

      expect(
        transformer.transform({
          loggedAt: new Date("2021-08-09T02:12:51.257Z"),
          logLevel: LogLevels.DEBUG,
          message: {
            transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
          },
        })
      ).toMatchObject<OutputLogMessage>({
        timestamp: 1628475171257,
        loglevel: LogLevels.DEBUG,
        transactionId: "9abc55b2-807b-4361-9dbe-aa88b1b2e978",
      });
    });
  });

  describe("OutputLogMessageToStringTransformer", () => {
    it("should transform log message object to string", () => {
      const transformer = new OutputLogMessageToStringTransformer();

      expect(
        transformer.transform({
          timestamp: 1,
          loglevel: LogLevels.INFO,
          transactionId: "1",
        })
      ).toBe(`{"timestamp":1,"loglevel":"info","transactionId":"1"}`);
    });
  });
});
