import { Telegraf, Telegram } from "telegraf";
import { DotEnvData, MessageData } from "../types/bot";
import { commands } from "./commands/commands";
import { logs } from "../utils/logs";
import { Command } from "../types/command.enum";

export class TelegramBot {
  public me: Telegraf;
  public methods: Telegram;

  constructor(botToken: string) {
    this.me = new Telegraf(botToken);
    this.methods = this.me.telegram;
  }

  public launch(dotEnvData: DotEnvData): void {
    commands.updateBotCommands(this.methods);

    this.listenStartCommand(dotEnvData);

    this.me.launch().catch((reason) => logs.error("Some error occured on bot launch:\n" + reason));

    logs.write("Bot succesfully was launched!");
  }

  private listenStartCommand(dotEnvData: DotEnvData): void {
    this.me.command("start", (ctx) => {
      const messageData: MessageData = ctx.message;

      commands.handle({
        command: Command.START,
        methods: this.methods,
        messageData,
        dotEnvData,
      });
    });
  }
}
