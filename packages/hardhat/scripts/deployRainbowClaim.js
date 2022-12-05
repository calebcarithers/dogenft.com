const hre = require("hardhat");
const { generateMerkleRoot } = require("../utils/merkle")

async function main() {
  const pixelGoerliAddress = "0x0eAADb89776e98B5D9a278f4a11f4b3f20226276"
  const pixelMainnetAddress = "0x07887Ee0Bd24E774903963d50cF4Ec6a0a16977D"
  const merkleRoot = generateMerkleRoot([
    "0xd801d86C10e2185a8FCBccFB7D7baF0A6C5B6BD5",
    "0xf716B2783c6dD45753b99Fc28636b0E1a0376179",
    "0xAd3c410Df6F60d61DEDf7202e8e4805C79EBf54a",
    "0x901e7cbA2605CD3C125dFeD78d139A26bEf23325"
  ])

  const factory = await hre.ethers.getContractFactory("RainbowClaim");
  const contract = await hre.upgrades.deployProxy(factory, [pixelGoerliAddress, merkleRoot]);
  await contract.deployed();
  console.log("Rainbow contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
