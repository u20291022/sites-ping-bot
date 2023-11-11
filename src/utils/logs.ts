import { LogTimeAndDate } from "../types/utils";
import { fileSystem } from "./filesystem";

class Logs {
  private logsDirectory = "logs";

  constructor() {
    fileSystem.makeDirectory(this.logsDirectory);
  }

  public error(errorMessage: string): void {
    this.write(errorMessage, true); // write error into log file, but do not show it in console
    throw new Error(errorMessage);
  }

  public write<Data extends { toString(): string }>(data: Data, silent = false): void {
    const logPath = this.getLogPath();
    const logMessage = this.convertDataIntoLogMessage(data);

    fileSystem.append(logPath, logMessage + "\n");

    if (!silent) {
      console.log(logMessage);
    }
  }

  private convertDataIntoLogMessage<Data extends { toString(): string }>(data: Data): string {
    const logTimeAndDate = this.getLogTimeAndDate(); 

    return `[${logTimeAndDate.time}] ${data.toString()}`;
  }

  private getLogPath(): string {
    const logTimeAndDate = this.getLogTimeAndDate(); 

    return this.logsDirectory + "/" + logTimeAndDate.date + ".txt";
  }

  private getLogTimeAndDate(): LogTimeAndDate {
    const currentDate = new Date();

    const date = currentDate.toLocaleDateString("ru-RU");
    const time = currentDate.toLocaleTimeString("ru-RU");

    return { date, time };
  }
}

export const logs = new Logs();