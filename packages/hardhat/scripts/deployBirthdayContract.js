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
    "ipfs://bafkreibqqlvvgvmk6ohutbbtfupqpbfwspovp3xvkp55bjvvajcts43q2m",
    "ipfs://bafkreid7kk4gi77zly6kuvo2qqhfyfojvui2wkdlygwdqpz46om5hthu4y",
    "ipfs://bafkreickocyscmhtozj3zr7hxgbngf2wcqdsgxft5xbt2llwhmlyq3dmfe",
    "ipfs://bafkreieypl6mbpjgzdxmyduf6mfq6ctlii2yygfvkk5jqscxm2utv7dybq"
  ];

  const totalSupply = 10839
  const merkelRoot = "0xf7ff247b77a017235ac515a518d9d27ca7bba0d7df6a5e617f7ef445c7744fdb"

  // throw new Error("HAVE YOU COMPUTED THE MOST RECENT MERKLE ROOT?")
  // throw new Error("HAVE YOU COMPUTED THE TOTAL SUPPLY?")


  const Souldbound = await hre.ethers.getContractFactory("DOGsFirstBirthday");
  const soulbound = await hre.upgrades.deployProxy(Souldbound, [merkelRoot, baseURIs, totalSupply]);
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
