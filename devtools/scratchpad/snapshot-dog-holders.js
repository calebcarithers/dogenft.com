const axios = require("axios")
// const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");
const { parse } = require("csv-parse/sync")
const fs = require("fs")
const { keccak256 } = require("ethers/lib/utils")

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

const isDev = true

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

    // if (isDev) {
    //     addresses = addresses.concat([
    //         "0xf716B2783c6dD45753b99Fc28636b0E1a0376179",
    //         "0xAd3c410Df6F60d61DEDf7202e8e4805C79EBf54a",
    //         "0xC096df02D3C765f6C720EBef5b947c72Ab0E6B65",
    //         "0xa77Af3795aA6027A3D499925fF7C45728E924fd9",
    //         "0xF65694e5A77799716d3c43C8620522D8e3983Ee8",
    //         "0xd2C4FD059542903abeCFB8D0C39459bb9d87C2Ba"
    //     ])
    // }


    console.log("total:", addresses.length)

    const uniqueAddresses = new Set(addresses)
    console.log("unique:", uniqueAddresses.size, "\n")

    const toGenerateMerkleTree = Array.from(uniqueAddresses)
    const merkleRoot = generateMerkleRoot(toGenerateMerkleTree)
    console.log("merkle root", merkleRoot)

    console.log("writing whitelist")
    writeAddressToFile("../../packages/frontend/services/whitelists/devSoulboundWhitelist.json", toGenerateMerkleTree)
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
      if (err) {
          console.error(err)
      }
  })
}

main()
