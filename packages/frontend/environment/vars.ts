import {objectKeys} from "../helpers/arrays";

interface Vars {
    AIRTABLE_API_KEY: string;
    AIRTABLE_BASE_ID: string;
    AIRTABLE_SUBMISSIONS_BASE_ID: string;
    NEXT_PUBLIC_DISCORD_LINK: string;
    NEXT_PUBLIC_TWITTER_LINK: string;
    NEXT_PUBLIC_INFURA_ID: string;
    NEXT_PUBLIC_APP_ENV: string;
    NEXT_PUBLIC_GA_ID: string;
    NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS: string;
    NEXT_PUBLIC_SOULBOUND_CONTRACT_ADDRESS: string
}

const vars: Vars = {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY as string,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID as string,
    AIRTABLE_SUBMISSIONS_BASE_ID: process.env.AIRTABLE_SUBMISSIONS_BASE_ID as string,
    NEXT_PUBLIC_DISCORD_LINK: process.env.NEXT_PUBLIC_DISCORD_LINK as string,
    NEXT_PUBLIC_TWITTER_LINK: process.env.NEXT_PUBLIC_TWITTER_LINK as string,
    NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID as string,
    NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_IDWT_CONTRACT_ADDRESS as string,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as string,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID as string,
    NEXT_PUBLIC_SOULBOUND_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_SOULBOUND_CONTRACT_ADDRESS as string
}

const assertVars = () => {

    const publicKeys = objectKeys(vars).filter((key) => {
        const t = key as string
        return t.includes("NEXT_PUBLIC")
    })
    const privateKeys = objectKeys(vars).filter((key) => {
        return !publicKeys.includes(key)
    })

    let keysToValidate = publicKeys
    if (typeof window === "undefined") {
        keysToValidate = privateKeys
    }

    keysToValidate.forEach(key => {
        if (vars[key] === undefined) {
            // alert(`You are missing environment variable: ${key}`)
            throw new Error(`Missing environment variable: ${key}`)
        }
    })
}
assertVars()

export {vars};
