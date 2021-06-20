const fsPromises = require('fs/promises');
const path = require('path');

const { mimeTypes } = require('../utils/constants');

const getStatic = (req, res) => {
  const { url } = req;

  let filePath = path.join(__dirname, '..', 'build', url);
  const ext = path.extname(url);
  let contentType = mimeTypes[ext] || 'text/plain';

  if (url === '/') {
    filePath += 'index.html';
    contentType = 'text/html';
  }

  let data = '';

  const getBinaryFile = async () => {
    try {
      data = await fsPromises.readFile(filePath, { encoding: 'binary' });
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { 'Content-Type': contentType }).end(data, 'binary');
  };

  const getStaticFile = async () => {
    try {
      data = await fsPromises.readFile(filePath, {
        encoding: 'utf-8',
      });
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { 'Content-Type': contentType }).end(data, 'utf-8');
  };

  const getMainPage = async () => {
    try {
      data = await fsPromises.readFile(filePath, {
        encoding: 'utf-8',
      });
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { 'Content-Type': contentType }).end(data, 'utf-8');
  };

  return { getMainPage, getStaticFile, getBinaryFile };
};

module.exports = { getStatic };
