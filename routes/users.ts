import { IncomingMessage, ServerResponse } from "../utils/types";
import { GITHUB_TOKEN } from "../config";

export const auth = (req: IncomingMessage, res: ServerResponse): void => {
  res
    .writeHead(200, { "Content-Type": "application/json" })
    .end(JSON.stringify({ token: GITHUB_TOKEN }), "utf-8");
};
