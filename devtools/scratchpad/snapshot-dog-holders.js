const axios = require("axios")
const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");

// TODO: get optimism holders
const networkToHodlerList = {
    ethereum: "https://static.dogtools.io/eth-holders-full.json",
    bsc: "https://static.dogtools.io/bsc-holders-full.json",
    polygon: "https://static.dogtools.io/poly-holders-full.json",
    arbitrum: "https://static.dogtools.io/arbi-holders-full.json",
}

const main = async () => {
    let addresses = []

    for (const network in networkToHodlerList) {
        const data = await getData(network)
        addresses = addresses.concat(Object.keys(data))
    }

    console.log("total addresses", addresses.length)

    const uniqueAddresses = new Set(addresses)
    const merkleRoot = generateMerkleRoot(Array.from(uniqueAddresses))
    console.log("unique addresses", uniqueAddresses.size)
    console.log("merkle root", merkleRoot)
}

const getData = async (networkName) => {
    if (!Object.keys(networkToHodlerList).includes(networkName)) {
        throw new Error("invalid network name")
    }
    const {data} = await axios.get(networkToHodlerList[networkName])
    console.log(`found ${Object.keys(data).length} results for ${networkName}`)
    return data
}

const generateMerkleRoot = (addresses) => {
    if (!Array.isArray(addresses)) {
        throw new Error("Addresses must be an array")
    }
    const leafNodes = addresses.map(address => keccak256(address))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    return merkleTree.getHexRoot()
}

main()
