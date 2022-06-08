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
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


const testMetadata = {
  "animation_url": "https://bitlectrolabs.mypinata.cloud/ipfs/QmW5nygeqSnLUknevnNscb5A5JZTAVYLtWUoMqS4jxtVrx/music/sani2_beat71.mp3",
  "attributes": [
    {"trait_type": "element", "value": "Cylinder"},
    {"trait_type": "element", "value": "Open Book"},
    {"trait_type": "element_count", "value": "2"},
    {"trait_type": "background", "value": "Fire Sky"},
    {"trait_type": "redeemable", "value": "Not Redeemable"},
    {"trait_type": "scarcity", "value": "Common"},
    {"trait_type": "song_title", "value": "Sani 2"},
    {"trait_type": "percussion", "value": "Beat 71"}
  ],
  "description": "As the first release from Bitlectro Labs, Dreamloops feature programmatically generated 8-bit musical loops and 16-bit artwork produced by Keil Corcoran of the band STRFKR. 1 in 5 Dreamloops (20%) will be redeemable for physical media (vinyl record or cassette tape). The 'album covers' are inspired by classic gaming platforms such as the Amiga, PC98, and Super Nintendo, featuring a retro-futuristic aesthetic. The music for each Dreamloop is composed entirely on a classic NES using a MIDINES cartridge. Each Dreamloop's music and art is unique and features elements of varying scarcity. Dreamloops are minted in a 'wrapped' state like a pack of collectible cards or a gift until 'unwrapped' using the unwrap feature at bitlectrolabs.com. The owner of each Dreamloop receives a Creative Commons CC BY-ND license for their musical loop and a CC BY license for the visual composition to use as they see fit.",
  "image": "https://bitlectrolabs.mypinata.cloud/ipfs/QmW5nygeqSnLUknevnNscb5A5JZTAVYLtWUoMqS4jxtVrx/images/cylinder_book_bg43.gif",
  "name": "Dreamloop #1334"
}
