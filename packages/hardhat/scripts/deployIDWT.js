// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const tokenURI = "ipfs://bafkreian2hk6hrsl6wd5znydtcv7qh3abknft4vey5g5lclyqams3hywke"

  let pixelAddress
  if (hre.network.name === "rinkeby") {
   pixelAddress = "0xA26461Fcf53f3E21cde8c902CA6e8e6ba9Def62f"
  } else if (hre.network.name === "mainnet") {
    pixelAddress = "0x07887Ee0Bd24E774903963d50cF4Ec6a0a16977D"
  } else {
    throw new Error("No pixel address for target network")
  }

  console.log("deploying IDWT")
  const VidePixel = await hre.ethers.getContractFactory("InDogeWeTrust");
  const videoPixel = await hre.upgrades.deployProxy(VidePixel, [pixelAddress]);
  await videoPixel.deployed();
  console.log("IDWT deployed to:", videoPixel.address);
  
  await videoPixel.setBaseURI(tokenURI)
  console.log(`IDWT baseURI set to: ${tokenURI}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });