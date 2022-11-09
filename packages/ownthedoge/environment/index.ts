import devWhitelist from "../services/whitelists/devSoulboundWhitelist.json";
import dogetownWhitelist from "../services/whitelists/lord-of-dogetown-whitelist.json";
import development from "./development";
import production from "./production";
import staging from "./staging";
import { vars } from "./vars";

export const isDev = () => process.env.NODE_ENV === "development";
export const isStaging = () =>
  process.env.NODE_ENV === "production" &&
  vars.NEXT_PUBLIC_APP_ENV === "staging";
export const isProduction = () =>
  process.env.NODE_ENV === "production" &&
  vars.NEXT_PUBLIC_APP_ENV === "production";

export const getSoulboundWhitelist = () => devWhitelist;
export const getDogetownWhitelist = () => dogetownWhitelist;

interface Environment {
  api: {
    baseURL: string | null;
    proxyURL?: string;
  };
  app: {
    barktankApplicationURL: string;
  };
}

let env: Environment;
if (isDev()) {
  env = development;
} else if (isStaging()) {
  env = staging;
} else if (isProduction()) {
  env = production;
} else {
  throw Error("Could not find correct environment");
}

export default env;
