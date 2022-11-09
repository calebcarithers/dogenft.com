const hre = require("hardhat");
const tokensToMint = require("./tokens")
const keccak256 = require("keccak256")
const { default: MerkleTree } = require("merkletreejs")
const fs = require("fs")


const deployERC1155 = async () => {
    const factory = await hre.ethers.getContractFactory("MockERC1155");
    const contract = await factory.deploy();
    await contract.deployed();
    console.log("MOCKERC1155 deployed to:", contract.address);

    console.log("Setting uris");
    for (const tokenId of Object.keys(tokensToMint)) {
        const balance = tokensToMint[tokenId].balance
        const uri = tokensToMint[tokenId].uri
        // console.log(`minting token ${tokenId} for ${balance} tokens`)
        await contract.mint(tokenId, balance)
        // console.log(`setting token ${tokenId} uri to ${uri}`)
        await contract.setUri(tokenId, uri)
    }
    return contract
}

const deploySandbox = async (erc1155address, merkleRoot) => {
    const factory = await hre.ethers.getContractFactory("SandboxDrop");
    const contract = await hre.upgrades.deployProxy(factory, [erc1155address, merkleRoot]);
    await contract.deployed();
    console.log("Sandbox contract deployed to:", contract.address);
    return contract
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

async function main() {
    const [owner, signer1, signer2, signer3, signer4] = await hre.ethers.getSigners()
    const localAddresses = [
        owner.address,
        signer1.address,
        signer2.address,
        signer3.address,
        signer4.address 
    ]
    writeJsonBlobToFile("../ownthedoge/services/whitelists/lord-of-dogetown-whitelist-hardhat.json", localAddresses)
    const merkleRoot = generateMerkleRoot(localAddresses)
    const erc1155Contract = await deployERC1155()
    const sandboxContract = await deploySandbox(erc1155Contract.address, merkleRoot)
    await erc1155Contract.setApprovalForAll(sandboxContract.address, true)
    for (const tokenId of Object.keys(tokensToMint)) {
        const balance = tokensToMint[tokenId].balance
        await sandboxContract.deposit(tokenId, balance)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

