import fsPromises from "fs/promises";
import path from "path";

import { IncomingMessage, ServerResponse } from "../utils/types";
import { MIME_TYPES } from "../utils/constants";

const getStatic = (
  req: IncomingMessage,
  res: ServerResponse
): { [functionName: string]: Function } | void => {
  const { url } = req;

  if (typeof url === "undefined") {
    return;
  }

  let filePath: string = path.join(__dirname, "..", "build", url);
  const ext: string = path.extname(url);
  let contentType: string = MIME_TYPES[ext] || "text/plain";

  if (url === "/") {
    filePath += "index.html";
    contentType = "text/html";
  }

  let data: string = "";

  const getBinaryFile = async (): Promise<void> => {
    try {
      data = await fsPromises.readFile(filePath, { encoding: "binary" });
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { "Content-Type": contentType }).end(data, "binary");
  };

  const getStaticFile = async (): Promise<void> => {
    try {
      data = await fsPromises.readFile(filePath, {
        encoding: "utf-8",
      });
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { "Content-Type": contentType }).end(data, "utf-8");
  };

  const getMainPage = async (): Promise<void> => {
    try {
      data = await fsPromises.readFile(filePath, {
        encoding: "utf-8",
      });
    } catch (err) {
      console.error(err);
    }

    res.writeHead(200, { "Content-Type": contentType }).end(data, "utf-8");
  };

  return { getMainPage, getStaticFile, getBinaryFile };
};

export { getStatic };
