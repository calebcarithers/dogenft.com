const axios = require("axios")
const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");
const { parse } = require("csv-parse/sync")
const fs = require("fs")

// DOG EXISTS ON THE FOLLOWING CHAINS
// 1: ethereum mainnet
// 2: bsc
// 3: polygon
// 4: arbitrum
// 5: optimism


const networkToHodlerList = {
    ethereum: "https://static.dogtools.io/eth-holders-full.json",
    bsc: "https://static.dogtools.io/bsc-holders-full.json",
    polygon: "https://static.dogtools.io/poly-holders-full.json",
    arbitrum: "https://static.dogtools.io/arbi-holders-full.json",
}

const main = async () => {
    console.log("querying holder addresses\n")

    let addresses = []

    for (const network in networkToHodlerList) {
        const data = await getData(network)
        const networkAddresses = Object.keys(data)
        console.log(`${network}:`, networkAddresses.length)
        addresses = addresses.concat(networkAddresses)
    }

    const optimismHolders = getOptimismHolderAddresses()
    console.log("optimism:", optimismHolders.length, "\n")
    addresses = addresses.concat(optimismHolders)

    const pixelOwnerAddresses = await getPixelHolderAddresses()
    console.log("pixels:", pixelOwnerAddresses.length, "\n")
    addresses = addresses.concat(pixelOwnerAddresses)

    console.log("total:", addresses.length)

    const uniqueAddresses = new Set(addresses)
    console.log("unique:", uniqueAddresses.size, "\n")

    const merkleRoot = generateMerkleRoot(Array.from(uniqueAddresses))
    console.log("merkle root", merkleRoot)

    console.log("writing whitelist")
    writeAddressToFile("../../packages/frontend/services/whitelists/devSoulboundWhitelist.json", addresses)
}

const getData = async (networkName) => {
    if (!Object.keys(networkToHodlerList).includes(networkName)) {
        throw new Error("invalid network name")
    }
    const {data} = await axios.get(networkToHodlerList[networkName])
    // console.debug(`found ${Object.keys(data).length} results for ${networkName}`)
    return data
}

const getOptimismHolderAddresses = () => {
    const data = fs.readFileSync("./data/optimsm-dog-holders-2022-08-28.csv", {encoding: 'utf8'})
    const records = parse(data, {columns: true})
    return records.map(item => item["HolderAddress"])
}

const getPixelHolderAddresses = async () => {
  const { data } = await axios.get("https://pixels.gainormather.xyz/v1/config")
  const holderAddresses = Object.keys(data)
  // must filter to get addresses who are still holding pixels
  return holderAddresses.filter(address => data[address].tokenIDs.length > 0)
}

const generateMerkleRoot = (addresses) => {
    if (!Array.isArray(addresses)) {
        throw new Error("Addresses must be an array")
    }
    const leafNodes = addresses.map(address => keccak256(address))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    return merkleTree.getHexRoot()
}

const writeAddressToFile = (name, data) => {
  return fs.writeFile(name, JSON.stringify(data), (err) => {
    console.error(err)
  })
}

main()
