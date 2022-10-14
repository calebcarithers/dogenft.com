import development from "./development";
import production from "./production";
import {vars} from "./vars";
import staging from "./staging";
import devWhitelist from "../services/whitelists/devSoulboundWhitelist.json";


export const isDev = () => process.env.NODE_ENV === "development"
export const isStaging = () => process.env.NODE_ENV === "production" && vars.NEXT_PUBLIC_APP_ENV === "staging"
export const isProduction = () => process.env.NODE_ENV === "production" && vars.NEXT_PUBLIC_APP_ENV === "production"

// TODO only return single whitelist here for now // DEV AND PROD MUST BE SYNCED
export const getSoulboundWhitelist = () => devWhitelist

interface Environment {
    api: {
        baseURL: string | null;
        proxyURL?: string;
    },
    app: {
        barktankApplicationURL: string
    }
}

let env: Environment
if (isDev()) {
    env = development
} else if (isStaging()) {
    env = staging
} else if (isProduction()) {
    env = production
} else {
    throw Error("Could not find correct environment")
}

export default env



