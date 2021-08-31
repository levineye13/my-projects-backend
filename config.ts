import dotenv from 'dotenv';

dotenv.config();

const {
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
  GITHUB_TOKEN = undefined,
} = process.env;

export { SERVER_HOST, SERVER_PORT, GITHUB_TOKEN };
