const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors')
const axios = require('axios');
const events = require('events');
const emitter = new events.EventEmitter();
const { PORT, TELEGRAM_BOT_TOKEN, WEATHER_API_KEY } = require('./config');

const app = express();
const corsOptions = {
  origin: ['https://tg-app-client.netlify.app', 'https://my-server-domain.com'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
 console.log(`process.env`, process.env);
 console.log(`TELEGRAM_BOT_TOKEN`, TELEGRAM_BOT_TOKEN);

const webAppUrl = 'https://tg-app-client.netlify.app'

// Хендлер соединения WebSocket
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (message) => {
    console.log('Received:', message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const menuOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Чат', callback_data: '/chat'}],
      [{text: 'Погода', callback_data: '/weather'}],
      [{text: 'Прогноз', callback_data: '/forecast'}],
      [{text: 'Инфо', callback_data: '/info'}],
    ]
  })
}

bot.setMyCommands([
  // {command:'/start', description: `Подключение к App 'TgGroundBot'`},
  {command:'/chat', description: `Открыть чат`},
  {command:'/weather', description: `Инфо о погоде`},
  {command:'/forecast', description: `Прогноз погоды`},
  {command:'/info', description: `Инфо о пользователе`},
])


// ф-ция по запуску приложения
const start = async () => {
  try {
  //  await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `Привет, ${process.env.TELEGRAM_CHAT_NAME}!`);

  await bot.on('message', msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
      console.log(msg) // ПОЛУЧАЕМ сообщ из ТГ
  
    // МЕНЮ В ПАНЕЛИ ТГ
    // if (text === '/start') {
    //   return bot.sendMessage(chatId, `Добро пожаловать в чат TgGroundBot. Выберите пункт меню ниже в панели:`, menuOptions);
    // }
    if (text === '/start') {
      return bot.sendMessage(chatId, `Добро пожаловать в чат TgGroundBot. Выберите пункт меню ниже:`, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Открыть окно приложения', web_app: {url: webAppUrl}} ],
          ]}
        });
    }

    if (text === '/chat') {
      return bot.sendMessage(chatId, `Открыть чат`, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Чат', web_app: {url: webAppUrl}} ],
          ]}
        });
    }
    if (text === '/weather') {
      return bot.sendMessage(chatId, `Открыть погоду`, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Погода0', web_app: {url: webAppUrl }} ],
          ]}
        });
    }
    if (text === '/forecast') {
      return bot.sendMessage(chatId, `Открыть прогноз`, {
        reply_markup: {
          inline_keyboard: [
            [{text: 'Прогноз', web_app: {url: webAppUrl }} ],
          ]}
        });
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `${msg.from.first_name} ${msg.from.last_name}`, menuOptions);
    }
  
    // отправляем в чат уведомление о получении их сообщения
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

// Всем участникам чата возвращается ответ, что был создан новый чат
app.get('/get-messages', (req, res) => {
  emitter.once('newMessage', (message) => {
      res.json(message)
  })
})

app.post('/new-messages', (req, res) => {
  const message = req.body;

  emitter.emit('newMessage', message)
  res.status(200)
})

// Weather API route
app.get('/api/weather', async (req, res) => {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Moscow`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Forecast API route
app.get('/api/forecast', async (req, res) => {
  const { days } = req.query;
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Moscow&days=${days}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// Эта строка позволяет и HTTP-серверу, и WebSocket-серверу слушать один порт
server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
