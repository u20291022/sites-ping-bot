import env from "dotenv";
import { TelegramBot } from "./bot/bot";

function main() {
  env.config();

  const { BOT_TOKEN, OWNER_ID, SITES } = process.env;

  if (!BOT_TOKEN || !OWNER_ID || !SITES) {
    throw new Error(
      "Please, update your .env file!\n" +
      "Example in the repo https://github.com/u20291022/sites-ping-bot"
    );
  }

  const botToken = BOT_TOKEN;
  const ownerId = OWNER_ID;
  const sites = SITES.split(" ");

  const telegramBot = new TelegramBot(botToken);
  telegramBot.launch({ ownerId, sites });
}

main();