export interface Writer {
  append: (value: string) => Promise<void>;
  end: () => void;
}

export class JsonWriter implements Writer {
  private isFirstWrite = true;

  constructor(private readonly stream: NodeJS.WritableStream) {}

  async append(value: string): Promise<void> {
    if (this.isFirstWrite) {
      this.stream.write("[");
    }

    await new Promise<void>((resolve, reject) => {
      this.stream.write(
        this.isFirstWrite ? value : `,${value}`,
        "utf-8",
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve();
        }
      );
    });

    this.isFirstWrite = false;
  }

  end() {
    this.stream.write("]");
    this.stream.end();
  }
}
