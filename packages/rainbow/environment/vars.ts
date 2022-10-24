import { objectKeys } from "dsl/helpers/arrays";

interface Vars {
    ethereumAddress: string,
    dogecoinAddress: string
}

const vars: Vars = {
    ethereumAddress: process.env.NEXT_PUBLIC_ETHEREUM_ADDRESS as string,
    dogecoinAddress: process.env.NEXT_PUBLIC_DOGECOIN_ADDRESS as string,
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
            throw new Error(`Missing environment variable: ${key}`)
        }
    })
}
assertVars()

export { vars };

