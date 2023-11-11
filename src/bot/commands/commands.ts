import { BotCommand } from "telegraf/typings/core/types/typegram";
import { startCommand } from "./start-command";
import { Telegram } from "telegraf";
import { CommandData } from "../../types/commands";
import { logs } from "../../utils/logs";
import { Command } from "../../types/command.enum";

class Commands {
  private botCommands: BotCommand[] = [];
  
  constructor() {
    const botStartCommand = startCommand.getBotCommand();

    this.botCommands = [...this.botCommands, botStartCommand];
  }

  public updateBotCommands(methods: Telegram): void {
    methods.setMyCommands(this.botCommands)
      .then(() => logs.write("Bot commands were set!"))
      .catch((reason) => logs.error("Some error occured with bot commands:\n" + reason));
  }

  public handle(commandData: CommandData): void {
    const { command } = commandData;

    switch(command) {
      case Command.START: {
        startCommand.execute(commandData);
        break;
      }
    }
  }
}

export const commands = new Commands();