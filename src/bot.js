import TelegramBot from 'node-telegram-bot-api'
import BotConfig from '../config/bot.json'
import User from './db/models/User'
export default class Bot {

  constructor() {
    this.bot = new TelegramBot(BotConfig.token, { polling: true })
    this.sendHelpInformation = this.sendHelpInformation.bind(this)
    this.checkExist = this.checkExist.bind(this)
    this.arestantWelcome = this.arestantWelcome.bind(this)
    this.cap = this.cap.bind(this)
  }

  listener() {
    console.log('listener');
    this.bot.on('message', this.checkExist)
    this.bot.onText(/^\/help(@\w+)?$/, this.sendHelpInformation)
    this.bot.onText(/(.*)вечер в хату(.*)/, this.arestantWelcome)
    this.bot.onText(/^\/currency(@\w+)?$/, this.cap)
    this.bot.onText(/^\/pidorreg(@\w+)?$/, this.cap)
    this.bot.onText(/^\/pidorinfo(@\w+)?$/, this.cap)
    this.bot.onText(/^\/upwork(@\w+)?$/, this.cap)
  }

  cap(msg) {
    this.bot.sendMessage(msg.chat.id, 'Метод в разработке')
  }

  checkExist(msg) {
    console.log(msg);
    console.log('check exist');
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

  arestantWelcome(msg) {
    console.log('arestant');
    this.bot.sendMessage(msg.chat.id, 'Вечер в хату, часик в радость, привет всем порядочным, процветать и крепнуть всему людскому ходу.')
  }

  sendHelpInformation(msg) {
    console.log('help');
    this.bot.sendMessage(msg.chat.id, 'Информация')
  }
}
