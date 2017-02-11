import TelegramBot from 'node-telegram-bot-api'
import BotConfig from '../config/bot.json'


let token = BotConfig.token

class Bot {
  constructor() {
    this.bot = new TelegramBot(token, { polling: true })
  }

  method() {
    this.bot.on('message', (msg) => {
      this.bot.sendMessage(msg.chat.id, 'хуй')
    })
  }

}

let bot = new Bot(token, { polling: true })

bot.method()
