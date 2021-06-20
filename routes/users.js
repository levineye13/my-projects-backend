const { GITHUB_TOKEN } = require('../config');

const auth = (req, res) => {
  res
    .writeHead(200, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({ token: GITHUB_TOKEN }), 'utf-8');
};

module.exports = { auth };
