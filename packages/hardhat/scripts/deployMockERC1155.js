// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const factory = await hre.ethers.getContractFactory("MockERC1155");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log("MOCKERC1155 deployed to:", contract.address);

  console.log("Setting uris");
  const tokensToMint = {
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980227")]: {
          balance: 15,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/3.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980229")]: {
          balance: 15,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/5.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980225")]: {
          balance: 15,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/1.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980230")]: {
          balance: 15,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/6.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980226")]: {
          balance: 10,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/2.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980224")]: {
          balance: 11,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/0.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980231")]: {
          balance: 18,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/7.json"
      },
      [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980232")]: {
          balance: 1,
          uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/8.json"
      }
  }

  for (const tokenId of Object.keys(tokensToMint)) {
    const balance = tokensToMint[tokenId].balance
    const uri = tokensToMint[tokenId].uri
    console.log(`minting token ${tokenId} for ${balance} tokens`)
    await contract.mint(tokenId, balance)
    console.log(`setting token ${tokenId} uri to ${uri}`)
    await contract.setUri(tokenId, uri)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
