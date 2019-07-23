import config from "./config";
import Api from "./controllers/api";
import logger from "./logger";
//@ts-ignore
import getEndpoints from "express-list-endpoints";
import * as http from "http";
import { AddressInfo } from "net";

// ErrnoError interface for use in onError
declare interface ErrnoError extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
}

const app: Api = new Api();
const DEFAULT_PORT = 3000;

function normalizePort(val: number | string): string {
  const _port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (_port && isNaN(_port)) {
    return DEFAULT_PORT.toString();
  } else if (_port >= 0) {
    return _port.toString();
  }
  return DEFAULT_PORT.toString();
}

const port: string = normalizePort(process.env.PORT);
const server = http.createServer(app.express);

function onError(error: ErrnoError): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      throw new Error(`${port} requires elevated privileges`);
    case "EADDRINUSE":
      throw new Error(`${port} is already in use`);
    default:
      throw error;
  }
}

function onListening(): void {
  const addr: AddressInfo | string | null = server.address();

  if (addr) {
    const bind: string =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

    logger.debug(
      `Routes: ${JSON.stringify(getEndpoints(app.express))
        .replace(/},{/g, "},\r\n  {")
        .replace(/\[{/, "[\r\n{")
        .replace(/}]/, "}\r\n]")}`
    );
    logger.info(`Configurations:\n${JSON.stringify(config, null, 3)}`);
    logger.info(`Listening on ${bind}...`);
  }
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
