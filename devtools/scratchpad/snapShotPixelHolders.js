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
    const addresses = await getPixelHolderAddresses()
    const merkleRoot = generateMerkleRoot(addresses)
    console.log("address of length", addresses.length, "found")
    console.log("got merkle root", merkleRoot)
    
    const filename = "lord-of-dogetown-whitelist.json"
    writeJsonBlobToFile(`../../packages/ownthedoge/services/whitelists/${filename}`, addresses)
    writeJsonBlobToFile(`./${filename}`, addresses)
}


main()
    