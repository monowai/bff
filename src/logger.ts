import winston from "winston";
import config from "./config";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => {
      const { timestamp, level, message, ...args } = info;
      return `${timestamp} [${level}] ${message} ${
        Object.keys(args).length ? `: ${JSON.stringify(args, null)}` : ""
      }`;
    })
  ),
  level: config.LOG_LEVEL || "info",
  transports: [new winston.transports.Console(),]
});

export default logger;
