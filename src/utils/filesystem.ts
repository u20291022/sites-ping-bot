import { existsSync, mkdirSync, appendFileSync } from "fs";

class FileSystem {
  public append<Data extends { toString(): string }>(path: string, data: Data): void {
    try {
      appendFileSync(path, data.toString());
    }
    catch(error) {
      throw new Error(`Some error occured on "${data.toString()}" data appending to "${path}" file:\n${error}`)
    }
  }

  public makeDirectory(path: string): void {
    if (!this.exists(path)) {
      try {
        mkdirSync(path, { recursive: true });
      }
      catch(error) {
        throw new Error(`Some error occured on "${path}" directory making:\n${error}`)
      }
    }
  }

  public exists(path: string): boolean {
    return existsSync(path);
  }
}

export const fileSystem = new FileSystem();