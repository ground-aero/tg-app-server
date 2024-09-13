require('dotenv').config();
// console.log(process.env);
module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY, 
  NODE_ENV: process.env.NODE_ENV,
};

// const {
//   TELEGRAM_BOT_TOKEN,
//   NODE_ENV,
// } = process.env;

// module.exports = {
//   TELEGRAM_BOT_TOKEN: NODE_ENV === 'production' ? TELEGRAM_BOT_TOKEN : 'TELEGRAM_BOT_TOKEN',
// };
