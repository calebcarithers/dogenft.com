import {objectKeys} from "../helpers/arrays";

interface Vars {
  AIRTABLE_API_KEY: string;
  AIRTABLE_BASE_ID: string;
  AIRTABLE_SUBMISSIONS_BASE_ID: string;
  NEXT_PUBLIC_DISCORD_LINK: string;
  NEXT_PUBLIC_TWITTER_LINK: string;
}

const vars: Vars = {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY as string,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID as string,
  AIRTABLE_SUBMISSIONS_BASE_ID: process.env.AIRTABLE_SUBMISSIONS_BASE_ID as string,
  NEXT_PUBLIC_DISCORD_LINK: process.env.NEXT_PUBLIC_DISCORD_LINK as string,
  NEXT_PUBLIC_TWITTER_LINK: process.env.NEXT_PUBLIC_TWITTER_LINK as string
}

const assertVars = () => {
  objectKeys(vars).map(key => {
    console.log(vars[key])
    if (vars[key] === undefined) {
      // alert(`You are missing environment variable: ${key}`)
      throw new Error(`Missing environment variable: ${key}`)
    }
  })
}
// assertVars()

export {vars};