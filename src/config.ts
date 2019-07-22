import { mergeDeepRight, pick } from "ramda";
import dotenv from "dotenv";

function url({ host, port }: { host: any; port: any }) {
  const envPort = process.env[port] || "";
  const envHost = process.env[host] || "";
  return `${envHost}:${envPort}`;
}

const APP_MODE = "APP_MODE";
const appMode = (process.env[APP_MODE] || "").toLowerCase();

const configFile = `${__dirname}/config/.env` + (appMode ? `.${appMode}` : "");

const localConfigs = dotenv.config({ path: configFile }).parsed;

const serviceEndpoints = {
  svcReferenceEndpoint: url({
    host: "REFERENCE_SERVICE_URL",
    port: "REFERENCE_SERVICE_PORT"
  })
};

//@ts-ignore
const configKeys = Object.keys(localConfigs);
const configs = pick(configKeys, process.env);

export default mergeDeepRight(serviceEndpoints, configs);
