import { createInterface } from "readline";

export interface Reader {
  read: () => AsyncGenerator<string>;
}

export class StreamReader implements Reader {
  constructor(private readonly stream: NodeJS.ReadableStream) {}

  async *read(): AsyncGenerator<string> {
    const readLineInterface = createInterface({
      input: this.stream,
      crlfDelay: Infinity,
    });

    for await (const line of readLineInterface) {
      yield line;
    }
  }
}
