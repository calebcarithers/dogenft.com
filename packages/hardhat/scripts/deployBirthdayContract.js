// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const baseURIs = [
    "ipfs://bafkreieqrutgtw5xzof4qpqaw6idyo6xry2p3w5x5dsm5mnpgah42bqfkm",
    "ipfs://bafkreihqek22nobwd5x5vaessfnnrk34pnknraiue3gxq3grlf7satb23a",
    "ipfs://bafkreigyfzvx6a62ngt277lba6slwzenrzhvjumcf6vaugykl3flzitxra",
    "ipfs://bafkreiau7fcyidy2lfc3i3gfl5ziicysdbxickrqoqty3vezvv2bpdstma"
  ];

  const merkelRoot = "0x94364b5f62fdb60fb392c27f38d5467f1f1199c4e1f5154d11513f1281e2b897"

  const Souldbound = await hre.ethers.getContractFactory("DOGsFirstBirthday");
  const soulbound = await hre.upgrades.deployProxy(Souldbound, [merkelRoot, baseURIs]);
  await soulbound.deployed();
  console.log("soulbound deployed to:", soulbound.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
