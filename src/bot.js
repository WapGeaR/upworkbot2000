import TelegramBot from 'node-telegram-bot-api'
import BotConfig from '../config/bot.json'

// Models
import User from './db/models/User'

let {token} = BotConfig

export default class Bot {
  constructor() {
    this.bot = new TelegramBot(token, { polling: true })
  }

  listener() {
    this.bot.on('message', (msg) => {
      return Promise
          .resolve()
          .then(() => {
            const user = msg.from;
            const chat = msg.chat;
            return User.create({
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
            })
          })
          .then(() => {
              this.bot.sendMessage(msg.chat.id, 'хуй')
          });
    })
  }

}
