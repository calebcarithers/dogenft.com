// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const tokenURI = "ipfs://bafkreic5jyppkizcemnjwbusu3xtd6ftpfnxdlxjjtgebihokfh34ciyou"

  console.log("deploying videoPixel")
  const VidePixel = await hre.ethers.getContractFactory("VideoPixel");
  const videoPixel = await hre.upgrades.deployProxy(VidePixel, ["InDoge Address"]);
  await videoPixel.deployed();
  console.log("videoPixel deployed to:", videoPixel.address);
  
  await videoPixel.setBaseURI(tokenURI)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });