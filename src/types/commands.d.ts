import { Telegram } from "telegraf";
import { DotEnvData, MessageData } from "./bot";
import { Command } from "./command.enum";

export interface CommandData {
  messageData: MessageData;
  methods: Telegram;
  command: Command;
  dotEnvData: DotEnvData;
}