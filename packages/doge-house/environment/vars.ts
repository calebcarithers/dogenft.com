import { objectKeys } from "dsl/helpers/arrays";

interface Vars {
  appEnv: "staging" | "production" | "local";
}

const vars: Vars = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV as "staging" | "production" | "local",
};

const PROD_DOGE_ADDRESS = "D7JykcnAKNVmreu97EcdRY58n4q5MrTRzV";
const DEV_DOGE_ADDRESS = "DNk1wuxV4DqiPMvqnwXU6R1AirdB7YZh32";

export const isStaging = () => vars.appEnv === "staging";
export const isProd = () => vars.appEnv === "production";
export const isDev = () => vars.appEnv === "local";
export const dogeAddress = isProd() ? PROD_DOGE_ADDRESS : DEV_DOGE_ADDRESS;

const assertVars = () => {
  const publicKeys = objectKeys(vars).filter((key) => {
    const t = key as string;
    return t.includes("NEXT_PUBLIC");
  });
  const privateKeys = objectKeys(vars).filter((key) => {
    return !publicKeys.includes(key);
  });

  let keysToValidate = publicKeys;
  if (typeof window === "undefined") {
    keysToValidate = privateKeys;
  }

  keysToValidate.forEach((key) => {
    if (vars[key] === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
};
assertVars();

export { vars };
