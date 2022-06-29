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
  const tokenURI = "ipfs://bafkreialqmooagbx5i3pao4wtr35t5v7dxwhma44znfuea5o4xf6uibcbm"

  console.log("deploying IDWT")
  const doge = await hre.ethers.getContractFactory("InDogeWeTrust");
  const IDWT = await hre.upgrades.deployProxy(doge, []);
  await IDWT.deployed();
  console.log("IDWT deployed to:", IDWT.address);
  console.log("setting base tokenURI to:", tokenURI)
  await IDWT.setBaseURI(tokenURI)
  console.log("In Doge We Trust deployed to:", IDWT.address);
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


const snoopMetadata = {
  "name": "Death Row Session: Vol. 2 (420 Edition) #582",
  "artist_name": "Snoop Dogg",
  "description": "Happy 420 mothafuccas. I made a mix for my favorite holiday and I’m only sharing it with y’all.\n\nThis time around, we wanted to show off some of the dope artists in the web3 world and make sure their voice gets heard on my platform. These cats pave the way 4 people like myself in this new wave. Big shout to MoRuf, Iman Europe, Black Dave, n Heno. \n\nI won’t spoil the surprise too much but I think you’ll like this 1. Ya’ll ever heard of Dr. Bombay? Thats my bored ape. We do it right over here chuuuuch.\n\nLet me know what you think. I’ll be here waiting.",
  "external_url": "https://www.sound.xyz/snoopdogg/death-row-session-vol-2-420-edition",
  "image": "https://soundxyz.mypinata.cloud/ipfs/QmbNjBeXUfEcU5aQjfuzJAgr8zUQ45sGcRHzGxkAidk4Ee",
  "audio_url": "https://soundxyz.mypinata.cloud/ipfs/QmaxWH6QakSw1HEzswHXpNwj5aSbk4riRibzfd3h8bNcfP",
  "animation_url": "https://soundxyz.mypinata.cloud/ipfs/QmaxWH6QakSw1HEzswHXpNwj5aSbk4riRibzfd3h8bNcfP",
  "comment_wall_url": "https://soundxyz.mypinata.cloud/ipfs/QmWykGTcCeCFs7qqMa6aWBeQQR1mFaE2tCc7kwWCscWJvJ",
  "attributes": [{"trait_type": "Death Row Session: Vol. 2 (420 Edition)", "value": "Song Edition"}]
}
