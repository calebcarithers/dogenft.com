const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");
const {BigNumber} = require("ethers");

describe("In Doge We Trust", function () {
  let IDWT;
  const tokenURI = "https://fucker.com/"
  const mintToken = async (signer) => {
    const contract = await IDWT.connect(signer)
    const tx = await contract.safeMint(signer.address)
    const receipt = await tx.wait()
    return {tx, receipt}
  }

  const getTokenIdFromReceipt = (receipt) => {
    return BigNumber.from(receipt.logs[0].topics[3]).toNumber()
  }

  before(async () => {
    console.log("deploying IDWT")
    const doge = await ethers.getContractFactory("InDogeWeTrust");
    IDWT = await upgrades.deployProxy(doge, []);
    await IDWT.deployed();
    console.log("IDWT deployed to:", IDWT.address);
    console.log("setting base tokenURI to:", tokenURI)
    await IDWT.setBaseURI(tokenURI)
  })

  it("mint a single token", async function () {
    const signers = await ethers.getSigners()
    const [owner] = signers

    await mintToken(owner)
    const {receipt} = await mintToken(owner)
    const tokenId = getTokenIdFromReceipt(receipt)
    console.log("debug:: tokenId", tokenId)
    const balance = await IDWT.connect(owner).balanceOf(owner.address)
    expect(balance.toNumber()).to.equal(2)

    const tokenURI = await IDWT.connect(owner).tokenURI(tokenId)
    console.log("debug:: tokenURI", tokenURI)
  });
});
