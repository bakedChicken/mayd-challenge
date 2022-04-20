import { InputLogMessage, OutputLogMessage } from "./types";

export interface Transformer<Input = any, Output = any> {
  transform: (value: Input) => Output;
}

export function composeTransformers<Input, Output>(
  ...transformers: Transformer[]
): Transformer<Input, Output> {
  return {
    transform: (value: Input): Output => {
      let transformedValue = value;

      for (const transformer of transformers) {
        transformedValue = transformer.transform(transformedValue);
      }

      return transformedValue as unknown as Output;
    },
  };
}

export class InputLogMessageToOutputLogMessageTransformer
  implements Transformer<InputLogMessage, OutputLogMessage>
{
  transform(value: InputLogMessage): OutputLogMessage {
    return {
      timestamp: value.loggedAt.valueOf(),
      loglevel: value.logLevel,
      transactionId: value.message.transactionId,
      error: value.message.err,
    };
  }
}

export class OutputLogMessageToStringTransformer
  implements Transformer<OutputLogMessage, string>
{
  transform(value: OutputLogMessage): string {
    return JSON.stringify(value);
  }
}
