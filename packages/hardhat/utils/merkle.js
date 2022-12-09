const {MerkleTree} = require("merkletreejs");
const { keccak256 } = require("ethers/lib/utils")


const generateMerkleRoot = (addresses) => {
    if (!Array.isArray(addresses)) {
        throw new Error("Addresses must be an array")
    }

    const leafNodes = addresses.map(address => keccak256(address))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    const merkleRoot = merkleTree.getHexRoot()
    return {
        merkleTree,
        merkleRoot
    }
}

module.exports = {generateMerkleRoot}
