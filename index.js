// polling бота
const TelegramBot = require('node-telegram-bot-api');
const { JWT_SECRET } = require('./config');

const token = JWT_SECRET;

const webAppUrl = 'https://tg-app-client.netlify.app' // 10min 19sec

const bot = new TelegramBot(token, {polling: true});

const menuOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Инфо', callback_data: '/info'}, {text: 'Погода1', callback_data: '/forecast1'}],
      [{text: 'Погода', callback_data: '/forecast'}],
      [{text: 'Назад', callback_data: '/back'}],
    ]
  })
}

const menuOptions2 = {
  reply_markup: {
    inline_keyboard: [
      [{text: 'Погода0', web_app: {url: webAppUrl}} ],
    ]
  }
}

bot.setMyCommands([
  {command:'/start', description: `Подключение к App 'TgGroundBot'`},
  {command:'/info', description: `Получить инфо о пользователе.`},
  {command:'/forecast', description: `Получить инфо о погоде.`},
])


// ф-ция по запуску приложения
const start = async () => {
  try {
  //  await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `Привет, ${process.env.TELEGRAM_CHAT_NAME}!`);

  await bot.on('message', msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
      console.log(msg) // ПОЛУЧАЕМ сообщ из ТГ
  
    if (text === '/start') {
      return bot.sendMessage(chatId, `Добро пожаловать в чат TgGroundBot. Выберите пункт меню ниже`, menuOptions);
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `${msg.from.first_name} ${msg.from.last_name}`, menuOptions);
    }
    if (text === '/forecast') {
      return bot.sendMessage(chatId, `Здесь будет инфо о погоде`, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Погода0', web_app: {url: webAppUrl}} ],
          ]}
        });
    }
  
    // // send a message to the chat acknowledging receipt of their message
    return bot.sendMessage(chatId, `Я вас не понял, попробуйте еще раз!`); // ОТПРАВЛЯЕМ СООБЩ В ТЕЛЕГУ
  });



  await bot.on('callback_query', msg => {
    const data = msg.data
    const chatId = msg.message.chat.id;

    bot.sendMessage(chatId, `Выбран пункт меню: ${data}`, menuOptions);
  })


 } catch (error) {
   console.log(error);
 }
}

start();