const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const doge = await ethers.getContractFactory("InDogeWeTrust");
    const doger = await doge.deploy();
    await doger.deployed();


    const signers = await ethers.getSigners()
    const [owner, addr1] = signers

    console.log("debug:: addr1", addr1)

    // await doge.connect(addr1).safeMint()

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await doger.safeMint();

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
