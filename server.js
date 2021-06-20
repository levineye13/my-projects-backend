const http = require('http');

const { SERVER_HOST, SERVER_PORT } = require('./config');
const { router } = require('./routes');

const server = http.createServer((req, res) => router(req, res));

server.listen(SERVER_PORT, SERVER_HOST);
