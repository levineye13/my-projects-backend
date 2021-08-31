import { getStatic } from './statics';
import { auth } from './users';
import { IncomingMessage, ServerResponse } from '../utils/types';
import { HTTP_METHODS } from '../utils/constants';

export const router = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  const { getBinaryFile, getStaticFile } = getStatic(req, res);
  const { url = '/', method = HTTP_METHODS.GET } = req;

  if (method === HTTP_METHODS.GET && url === '/api/user') {
    return auth(req, res);
  }

  if (method === HTTP_METHODS.GET && /(.jpg|.png|.woff|.woff2)$/.test(url)) {
    await getBinaryFile();
    return;
  }

  if (
    method === HTTP_METHODS.GET &&
    /(\/|\/favicon\.ico|\/manifest\.json|\/static)/.test(url)
  ) {
    await getStaticFile();
    return;
  }
};
