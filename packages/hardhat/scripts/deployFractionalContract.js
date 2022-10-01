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

  // const rinkebyPixelAddress = "0xA26461Fcf53f3E21cde8c902CA6e8e6ba9Def62f"
  const mainnetPixelAddress = "0x07887Ee0Bd24E774903963d50cF4Ec6a0a16977D"

  const fractionManagerFactory = await hre.ethers.getContractFactory("FractionManager");
  const fractionManager = await hre.upgrades.deployProxy(fractionManagerFactory, [mainnetPixelAddress]);
  await fractionManager.deployed();
  console.log("DogeMajor Manager deployed to:", fractionManager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
