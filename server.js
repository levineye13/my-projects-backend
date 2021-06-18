const http = require('http');
const fsPromise = require('fs/promises');
const path = require('path');
const { SERVER_HOST, SERVER_PORT, GITHUB_TOKEN } = require('./config');
const { mimeTypes } = require('./utils/constants');

const server = http.createServer((req, res) => {
  (async () => {
    const { url, method } = req;

    if (method === 'GET' && url === '/api/user') {
      return res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ token: GITHUB_TOKEN }), 'utf-8');
    }

    let filePath = path.join(__dirname, 'build', url);
    const ext = path.extname(url);
    let contentType = mimeTypes[ext] || 'text/plain';

    if (url === '/') {
      filePath += 'index.html';
      contentType = 'text/html';
    }

    let data;

    if (method === 'GET' && ['.jpg', '.png', '.woff', '.woff2'].includes(ext)) {
      try {
        data = await fsPromise.readFile(filePath, {
          encoding: 'binary',
        });
      } catch (err) {
        console.error(err);
      }

      return res
        .writeHead(200, { 'Content-Type': contentType })
        .end(data, 'binary');
    }

    if (
      method === 'GET' &&
      /(\/|\/favicon\.ico|\/manifest\.json|\/static)/.test(url)
    ) {
      try {
        data = await fsPromise.readFile(filePath, {
          encoding: 'utf-8',
        });
      } catch (err) {
        console.error(err);
      }
      return res
        .writeHead(200, { 'Content-Type': contentType })
        .end(data, 'utf-8');
    }
  })();
});

server.listen(SERVER_PORT, SERVER_HOST);
