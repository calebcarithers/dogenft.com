const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const doge = await ethers.getContractFactory("InDogeWeTrust");
    const IDWT = await doge.deploy();
    await IDWT.deployed();


    const signers = await ethers.getSigners()
    const [owner, addr1] = signers

    const tx = await IDWT.connect(owner).safeMint(addr1.address, "teeesst")
    console.log("reciept::", await tx.wait())

    const balanceTx = await IDWT.connect(owner).balanceOf(addr1.address)
    console.log("receipt::", balanceTx)

  });
});
