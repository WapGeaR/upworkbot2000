import TelegramBot from 'node-telegram-bot-api'
import BotConfig from '../config/bot.json'

let {token} = BotConfig

export default class Bot {
  constructor() {
    this.bot = new TelegramBot(token, { polling: true })
  }

  listener() {
    this.bot.on('message', (msg) => {
      this.bot.sendMessage(msg.chat.id, 'хуй')
    })
  }

}
