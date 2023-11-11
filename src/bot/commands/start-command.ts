import { BotCommand } from "telegraf/typings/core/types/typegram";
import { CommandData } from "../../types/commands";
import { logs } from "../../utils/logs";
import { ping } from "../../utils/ping";

class StartCommand {
  private botCommand: BotCommand = { command: "start", description: "Starts the bot." };

  public getBotCommand(): BotCommand {
    return this.botCommand;
  }

  public execute(commandData: CommandData): void {
    this.sendStartMessage(commandData);
  }

  private sendStartMessage(commandData: CommandData): void {
    const { methods, messageData } = commandData;
    
    const chatId = messageData.chat.id;
    const startMessage = this.getStartMessage(commandData);

    methods.sendMessage(chatId, startMessage, { disable_web_page_preview: true })
      .catch((reason) => {
        logs.error(`Some error occured on start message sending (chatId: ${chatId})!\n${reason}`);
        
        // try to notify user about error
        methods.sendMessage(chatId, "Some error occured on start message sending.").catch(() => {});
      });
  }

  private getStartMessage(commandData: CommandData): string {
    const { messageData, dotEnvData } = commandData;
    
    const chatId = messageData.chat.id;
    const ownerId = dotEnvData.ownerId;
    const sites = dotEnvData.sites;

    const isUserOwner = chatId.toString() === ownerId;
    const startMessage = isUserOwner ? 
      `Hello!\nI'm pinging sites: ${sites.join(" ")}` :
      (
        "Hello!\nI'm not your bot!\n" +
        "You can create yours from this repo - https://github.com/u20291022/sites-ping-bot"
      );

    return startMessage;
  }
}

export const startCommand = new StartCommand();