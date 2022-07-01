const axios = require("axios")

const networkToHodlerList = {
    ethereum: "https://static.dogtools.io/eth-holders-full.json",
    bsc: "https://static.dogtools.io/bsc-holders-full.json",
    polygon: "https://static.dogtools.io/poly-holders-full.json",
    arbitrum: "https://static.dogtools.io/arbi-holders-full.json"
}

const main = async () => {
    const arbHolders = getData("arbitrum")
}

const getData = async (networkName) => {
    if (!Object.keys(networkToHodlerList).includes(networkName)) {
        throw new Error("invalid network name")
    }
    const {data} = await axios.get(networkToHodlerList[networkName])
    console.log(data)
    console.log("\n" + `found ${Object.keys(data).length} results for ${networkName}`)
    return data
}

main()
