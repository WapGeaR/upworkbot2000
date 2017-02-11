import TelegramBot from 'node-telegram-bot-api'
let token = '365374137:AAGlhMl6IQ92Foqka21m1mbvisp0hZYzWa4'

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
