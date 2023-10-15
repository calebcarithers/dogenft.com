import { objectKeys } from "dsl/helpers/arrays";

interface Vars {
  // ethereumAddress: string;
  // dogecoinAddress: string;
  appEnv: "staging" | "production";
  // gaId: string;
  // sentryDSN: string;
}

const vars: Vars = {
  // ethereumAddress: process.env.NEXT_PUBLIC_ETHEREUM_ADDRESS as string,
  // dogecoinAddress: process.env.NEXT_PUBLIC_DOGECOIN_ADDRESS as string,
  appEnv: process.env.NEXT_PUBLIC_APP_ENV as "staging" | "production",
  // gaId: process.env.NEXT_PUBLIC_GA_ID as string,
  // sentryDSN: process.env.NEXT_PUBLIC_SENTRY_DSN as string,
};

export const isStaging = () => vars.appEnv === "staging";
export const isProd = () => vars.appEnv === "production";

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
