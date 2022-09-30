// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const FractionManagerFactory = await hre.ethers.getContractFactory("FractionManager");
  const fractionManager = await hre.upgrades.deployProxy(
    FractionManagerFactory, 
    ["Pixel Contract address", "Fraction Contract address", "Fraction Id"]
  );
  await fractionManager.deployed();
  console.log("fractionManager deployed to:", fractionManager.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
