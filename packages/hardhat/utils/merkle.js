const {MerkleTree} = require("merkletreejs");

const generateMerkleRoot = (addresses) => {
    if (!Array.isArray(addresses)) {
        throw new Error("Addresses must be an array")
    }

    const leafNodes = addresses.map(address => keccak256(address))
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    return merkleTree.getHexRoot()
}

module.exports = {generateMerkleRoot}
