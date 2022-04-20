import { LogLevels } from "./LogLevels";

export type InputLogMessage = Readonly<{
  loggedAt: Date;
  logLevel: LogLevels;
  message: Record<string, unknown> & {
    transactionId: string;
    err?: string;
  };
}>;

export type OutputLogMessage = Readonly<{
  timestamp: number;
  loglevel: LogLevels;
  transactionId: string;
  error?: string;
}>;
