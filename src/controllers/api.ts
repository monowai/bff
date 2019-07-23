import express from "express";
import timeout from "connect-timeout";
import health from "./health";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import { toColoredStatusCode } from "../helpers/httpUtils";

// const DEFAULT_SERVER_TIMEOUT_SECONDS = 160;
// @ts-ignore
// const SERVER_TIMEOUT =
//   parseInt(config.BFF_TIMEOUT_SECONDS || DEFAULT_SERVER_TIMEOUT_SECONDS) * 1000;

// const haltOnTimeout: Middleware = (req, res, next) => {
//   req.on("timeout", function () {
//     res
//       .status(504)
//       .json({error: {statusCode: 504, message: "Response timeout"}});
//   });
//   if (!req.timedout) next();
// };

export default class Api {
  public express: express.Application;

  private static morgan(): express.RequestHandler {
    //@ts-ignore
    morgan.token("coloredStatus", toColoredStatusCode);

    const options: morgan.Options =  {
      skip: req => /\/health\/?$/.test(req.url.trim())
    };
    return morgan(
      ":date[iso] [http] :remote-addr :remote-user :method :url :colouredStatus :response-time ms" +
        " - :res[content-length] ':user-agent'",
      options
    );
  }

  // create the express instance, attach app-level middleware, attach routers
  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // register middleware
  private middleware(): void {
    this.express.use(helmet());
    this.express.use(helmet.noCache());
    this.express.use(Api.morgan());
    this.express.use(bodyParser.json({ limit: "100mb" }));
    this.express.use(bodyParser.urlencoded({ extended: false }));

    // if (process.env.NODE_ENV !== "test") {
    //     this.express.use(keyCloak.middleware());
    // }

    this.express.use(timeout("20", { respond: false }));
    // this.express.use(haltOnTimeout);
  }

  // connect resource routers
  private routes(): void {
    this.express.use("/api", health);
  }
}
