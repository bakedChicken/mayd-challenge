import { createReadStream, createWriteStream, PathLike } from "fs";
import { resolve } from "path";
import { ErrorLogMessageFilter } from "./Filter";
import { parse } from "./parse";
import { LogMessageFormatParser } from "./Parser";
import { StreamReader } from "./Reader";
import {
  composeTransformers,
  InputLogMessageToOutputLogMessageTransformer,
  OutputLogMessageToStringTransformer,
} from "./Transformer";
import { InputLogMessage } from "./types";
import { JsonWriter } from "./Writer";

async function main(inputFile: PathLike, outputFile: PathLike) {
  const readStream = createReadStream(inputFile, {
    encoding: "utf-8",
  });

  const writeStream = createWriteStream(outputFile, {
    encoding: "utf-8",
  });

  await parse<InputLogMessage>(
    new StreamReader(readStream),
    new LogMessageFormatParser(),
    new ErrorLogMessageFilter(),
    composeTransformers<InputLogMessage, string>(
      new InputLogMessageToOutputLogMessageTransformer(),
      new OutputLogMessageToStringTransformer()
    ),
    new JsonWriter(writeStream)
  );
}

const inputArgIndex = process.argv.indexOf("--input");
const outputArgIndex = process.argv.indexOf("--output");

if (inputArgIndex === -1 || outputArgIndex === -1) {
  console.error("FORMAT: node parser.js --input filename --output filename");
  process.exit(1);
}

const input = resolve(process.argv[inputArgIndex + 1]);
const output = resolve(process.argv[outputArgIndex + 1]);

main(input, output).catch(console.error);
