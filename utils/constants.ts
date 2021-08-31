import { IHttpMethods } from './interfaces';

export const MIME_TYPES: { [ext: string]: string } = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

export const HTTP_METHODS: IHttpMethods = {
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
