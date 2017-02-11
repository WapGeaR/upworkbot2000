import TelegramBot from 'node-telegram-bot-api'
import BotConfig from '../config/bot.json'

// Models
import User from './db/models/User'

let {token} = BotConfig

export default class Bot {
  constructor() {
    this.isExistingUser = this.isExistingUser.bind(this);
    this.bot = new TelegramBot(token, { polling: true })
  }

  isExistingUser(tg_user, chat) {
    return User
        .findOne({
          id: tg_user.id
        })
        .then((user) => {
          if (!user) {
            return User
                .create({
                    id: tg_user.id,
                    username: tg_user.username,
                    first_name: tg_user.first_name,
                    last_name: tg_user.last_name,
                })
          }
        })
  }


  listener() {
    this.bot.on('message', (msg) => {
      const user = msg.from;
      const chat = msg.chat;

      return this.isExistingUser(user, chat)
          .then(() => {
              this.bot.sendMessage(msg.chat.id, 'хуй')
          });
    })
  }

}
