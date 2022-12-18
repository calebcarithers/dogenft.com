const hre = require("hardhat");

async function main() {
  await deploy()
}

async function deploy() {
  const nounletAddress = "0x13901ecbBc74242795Af3a3c9880a319D78796Eb"
  const factory = await hre.ethers.getContractFactory("NounletWrapper");
  const contract = await factory.deploy(nounletAddress);
  await contract.deployed();
  console.log("Nounlet wrapper contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1)
  });
