import TelegramBot from 'node-telegram-bot-api'
import BotConfig from '../config/bot.json'
import User from './db/models/User'
export default class Bot {

  constructor() {
    this.bot = new TelegramBot(BotConfig.token, { polling: true })
    this.sendHelpInformation = this.sendHelpInformation.bind(this)
    this.checkExist = this.checkExist.bind(this)
  }

  listener() {
    this.bot.on('message', this.checkExist)
    this.bot.onText(/^\/help(@\w+)?$/, this.sendHelpInformation)
  }

  checkExist(msg) {
    const user = msg.from;
    const chat = msg.chat;
    User.findOne({
      id: user.id
    }).then(user => {
      if(!user) {
        User.create({
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        })
      }
    })
  }

  sendHelpInformation(msg) {
    this.bot.sendMessage(msg.chat.id, 'Информация')
  }
}
