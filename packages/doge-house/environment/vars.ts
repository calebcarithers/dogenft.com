import { objectKeys } from "dsl/helpers/arrays";

interface Vars {
  appEnv: "staging" | "production";
}

const vars: Vars = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV as "staging" | "production",
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
