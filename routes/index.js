const { getStatic } = require('./statics');
const { auth } = require('./users');
const { HTTP_METHODS } = require('../utils/constants');

const router = async (req, res) => {
  const { getBinaryFile, getStaticFile, getMainPage } = getStatic(req, res);
  const { url, method } = req;

  if (method === HTTP_METHODS.GET && url === '/api/user') {
    return auth(req, res);
  }

  if (method === HTTP_METHODS.GET && /(.jpg|.png|.woff|.woff2)$/.test(url)) {
    await getBinaryFile();
    return;
  }

  if (
    method === HTTP_METHODS.GET &&
    /(\/favicon\.ico|\/manifest\.json|\/static)/.test(url)
  ) {
    await getStaticFile();
    return;
  }

  if (method === HTTP_METHODS.GET && url === '/') {
    await getMainPage();
    return;
  }
};

module.exports = { router };
