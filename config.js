require('dotenv').config();
// console.log(process.env);

const {
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
};
