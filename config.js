require('dotenv').config();

const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
  GITHUB_TOKEN = '',
} = process.env;

module.exports = { SERVER_HOST, SERVER_PORT, GITHUB_TOKEN };
