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

  const merkelRoot = "0xc5fcb453494a19d09b6e665a4cb1b4692de6ab2ffa60d1789594433812839ee0"

  const Souldbound = await hre.ethers.getContractFactory("DOGsFirstBirthday");
  const soulbound = await hre.upgrades.deployProxy(Souldbound, [merkelRoot, baseURIs, 10826]);
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
