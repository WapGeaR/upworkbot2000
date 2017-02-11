import _ from 'lodash'
import TelegramBot from 'node-telegram-bot-api'
import User from './db/models/User'
export default class Bot {

  constructor() {
    const token = process.env.BOT_TOKEN || null;
    if (!token) {
      throw new Error("No token provided (env: BOT_TOKEN)")
    }

    this.bot = new TelegramBot(token, { polling: true })
    this.sendHelpInformation = this.sendHelpInformation.bind(this)
    this.checkExist = this.checkExist.bind(this)
    this.arestantWelcome = this.arestantWelcome.bind(this)
    this.cap = this.cap.bind(this);
  }

  listener() {
    this.bot.on('message', (msg) => {
      return this
        .checkExist(msg)
        .then(user => {
          let command = null;

          _.each(msg.entities, value => {
            if (value.type === 'bot_command') {
              command = msg.text.substring(value.offset, value.offset + value.length)
            }
          });

          return [
            user,
            command
          ]
        })
        .then(([user, command]) => {
          if (command) {
            return this.proceedCommand(command, msg, user);
          } else {
            // not command
          }
        });
    });

  }

  proceedCommand(command, msg, user) {
    console.log('User entered: ', command)
    switch (command) {
      case '/help': {
        this.sendHelpInformation(msg);
        break;
      }
      default: {
        this.cap(msg);
        break;
      }
    }
  }

  cap(msg) {
    this.bot.sendMessage(msg.chat.id, 'Метод в разработке')
  }

  checkExist(msg) {
    const user = msg.from;
    return User
      .findOneAndUpdate({
        id: user.id
      }, {
        last_message_at: Date.now()
      }, {
        new: true,
        upsert: true
      });
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
