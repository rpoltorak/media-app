const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

module.exports = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
