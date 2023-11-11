import { execSync } from "child_process";

class Ping {
  private averagePingRegExp = /Average = \d+ms/;
  private domainUrlRegExp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/;

  public async getAverage(url: string): Promise<number> {
    return await new Promise((resolve, reject) => {
      const domainUrlMatches = url.match(this.domainUrlRegExp);

      if (!domainUrlMatches || !domainUrlMatches[1]) {
        return reject("Bad site url!");
      }

      const domainUrl = domainUrlMatches[1];

      const pingString = execSync(`ping ${domainUrl}`).toString();
      const averagePingStringMatches = pingString.match(this.averagePingRegExp);

      if (!averagePingStringMatches || !averagePingStringMatches[0]) {
        return reject("Can't match average ping string! Maybe site is down");
      }

      // match only digits
      const averagePingMatches = averagePingStringMatches[0].match(/\d+/);
      
      if (!averagePingMatches || !averagePingMatches[0]) {
        return reject("Can't match average ping! Maybe site is down");
      }

      const averagePing = Number(averagePingMatches[0]);

      resolve(averagePing);
    });
  }
}

export const ping = new Ping();