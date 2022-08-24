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
  const baseURIs = ["base1", "base2", "base3", "base4"];
  const Souldbound = await hre.ethers.getContractFactory("Soulbound");
  const soulbound = await hre.upgrades.deployProxy(Souldbound, ["0x196d644482833fb5e75a164bdc305b35efeb8151006ea1e79bd732a97bd620c9", baseURIs]);
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