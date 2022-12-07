const hre = require("hardhat");
const { generateMerkleRoot } = require("../utils/merkle")
const axios = require("axios")
const fs = require("fs")

async function main() {
  await deploy()
}

async function deploy() {
  const pixelGoerliAddress = "0x0eAADb89776e98B5D9a278f4a11f4b3f20226276"
  const pixelMainnetAddress = "0x07887Ee0Bd24E774903963d50cF4Ec6a0a16977D"

  // const addresses = await getWhitelistedAddresses()
  // const merkleRoot = getMerkleRoot()
  const merkleRoot = "0x5c4e2c7b746f6d6100a9aaffada1a09e4378a762402366b48440459fb1fd05a5"
  console.log("got merkle root", merkleRoot)

  const factory = await hre.ethers.getContractFactory("RainbowClaim");
  const contract = await hre.upgrades.deployProxy(factory, [pixelGoerliAddress, merkleRoot]);
  await contract.deployed();
  console.log("Rainbow contract deployed to:", contract.address);
}

async function getMerkleRoot() {
  const whitelist = JSON.parse(fs.readFileSync("./rainbow-whitelist.json"))
  const { merkleRoot } = generateMerkleRoot(whitelist)
  return merkleRoot
}

async function getWhitelistedAddresses() {
  const {data: mainnetSwappers} = await axios.get("http://localhost:3003/statue-campaign/swaps")
  console.log("total swappers:", mainnetSwappers.length)

  const qualifiedSwappers = mainnetSwappers.filter(item => item.baseAmount >= 16969)
  console.log("qualified swappers:", qualifiedSwappers.length)

  const addresses = qualifiedSwappers.map(item => item.clientAddress)
  const uniqueAddresses = []
  for (const address of addresses) {
    if (!uniqueAddresses.includes(address)) {
      uniqueAddresses.push(address)
    }
  }
  console.log("unique swappers found:", uniqueAddresses.length)
  fs.writeFileSync("./rainbow-whitelist.json", JSON.stringify(uniqueAddresses))
  return uniqueAddresses
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1)
  });
