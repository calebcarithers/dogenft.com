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

  const sandboxGoerliAddress = ""
  const sandboxMainnetAddress = "0xa342f5D851E866E18ff98F351f2c6637f4478dB5"
  const merkleRoot = "0x6cb8b6c57591c30ab9530e1699ba7a08f9a45804c210b6ba832e475e7304637a"

  const factory = await hre.ethers.getContractFactory("SandboxDrop");
  const contract = await hre.upgrades.deployProxy(factory, [sandboxGoerliAddress, merkleRoot]);
  await contract.deployed();
  console.log("DogeMajor Manager deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
