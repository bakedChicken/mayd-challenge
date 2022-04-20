import { Readable } from "stream";
import { StreamReader } from "./Reader";

describe("Reader", () => {
  it("should read stream line by line", async () => {
    const readable = new Readable();
    readable.push("hello\nworld");
    readable.push(null);

    const reader = new StreamReader(readable);

    const iterator = await reader.read().next();
    expect(iterator.value).toBe("hello");
  });
});
