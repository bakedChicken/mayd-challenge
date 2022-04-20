import { Filter } from "./Filter";
import { Parser } from "./Parser";
import { Reader } from "./Reader";
import { Transformer } from "./Transformer";
import { Writer } from "./Writer";

// parser enterprise edition

export async function parse<T>(
  reader: Reader,
  parser: Parser<T>,
  filter: Filter<T>,
  transformer: Transformer<T, string>,
  writer: Writer
) {
  for await (const rawLine of reader.read()) {
    try {
      const parseResult = parser.parse(rawLine);

      if (parseResult.result === "error") {
        console.error("An error occured during parsing:");
        console.error(parseResult.error);
        console.error("skipping...");
        continue;
      }

      if (filter.check(parseResult.message)) {
        await writer.append(transformer.transform(parseResult.message));
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }

  writer.end();
}
