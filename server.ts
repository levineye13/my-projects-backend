import http from 'http';

import { SERVER_HOST, SERVER_PORT } from './config';
import { IncomingMessage, ServerResponse } from './utils/types';
import { router } from './routes';

const server: http.Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    router(req, res);
  }
);

server.listen({ port: SERVER_PORT, host: SERVER_HOST });
