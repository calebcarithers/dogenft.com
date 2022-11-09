const axios = require("axios")
const keccak256 = require("keccak256")
const { default: MerkleTree } = require("merkletreejs")
const fs = require("fs")


const getPixelHolderAddresses = async () => {
    const { data } = await axios.get("https://api.ownthedoge.com/v1/config")
    const addresses = Object.keys(data)
    return addresses.filter(address => data[address].tokenIds.length > 0)
}

const generateMerkleRoot = (addresses) => {
    const leafNodes = addresses.map(address => keccak256(address))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    return merkleTree.getHexRoot()
}

const writeJsonBlobToFile = (name, data) => {
  return fs.writeFile(name, JSON.stringify(data), (err) => {
      if (err) {
          console.error(err)
      }
  })
}

const main = async () => {
    // const addresses = await getPixelHolderAddresses()
    const addresses = [
        "0x12E9d84aF808C26F21e383af5762F48b990aDC09",
        "0xd801d86C10e2185a8FCBccFB7D7baF0A6C5B6BD5",
        "0xAd3c410Df6F60d61DEDf7202e8e4805C79EBf54a",
        "0xC096df02D3C765f6C720EBef5b947c72Ab0E6B65",
        "0x77509a9adFB1A85C2113eE80FBb195d771dcdFc2"
    ]

    const merkleRoot = generateMerkleRoot(addresses)
    console.log("address of length", addresses.length, "found")
    console.log("got merkle root", merkleRoot)
    
    const filename = "lord-of-dogetown-whitelist-hardhat.json"
    writeJsonBlobToFile(`../../packages/ownthedoge/services/whitelists/${filename}`, addresses)
    writeJsonBlobToFile(`./${filename}`, addresses)
}


main()
    