const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");
const {BigNumber} = require("ethers");
const {keccak256} = require("ethers/lib/utils");
const {MerkleTree} = require("merkletreejs");

describe("In Doge We Trust", function () {
  let DOGsFirstBirthday, signers, whitelisted, notWhitelisted, tree;
  const baseURIs = ["base1", "base2", "base3", "base4"];

  const mintToken = async (signer, type) => {
    const contract = await DOGsFirstBirthday.connect(signer)
    const proof = tree.getHexProof(keccak256(signer.address))
    return contract.safeMint(proof, type)
  }

  const getTokenIdFromReceipt = (receipt) => {
    return BigNumber.from(receipt.logs[0].topics[3]).toNumber()
  }

  before(async () => {
    console.log("generating merkle root")
    signers = await ethers.getSigners()
    whitelisted = signers.slice(0, 5)
    notWhitelisted = signers.slice(5, 10)

    const leaves = whitelisted.map(account => keccak256(account.address))
    tree = new MerkleTree(leaves, keccak256, { sort: true })
    const merkleRoot = tree.getHexRoot()
    console.log("got merkle root", merkleRoot)


    console.log("\ndeploying DOGsFirstBirthday")
    const DOGsFirstBirthdayFactory = await ethers.getContractFactory("DOGsFirstBirthday");
    DOGsFirstBirthday = await upgrades.deployProxy(DOGsFirstBirthdayFactory, [merkleRoot, baseURIs, whitelisted.length]);
    await DOGsFirstBirthday.deployed();
    console.log("DOGsFirstBirthday deployed to:", DOGsFirstBirthday.address);
  })

  it("should have the correct total supply", async function () {
    const signer = whitelisted[0]
    const supply = await DOGsFirstBirthday.connect(signer).totalSupply()
    await expect(supply.toNumber()).to.equal(5)
  })

  it("mint only a token", async function() {
    const signer = whitelisted[0]
    await mintToken(signer, 0)
    await expect(mintToken(signer, 0)).to.be.revertedWith("Address already claimed")

    const balance = await DOGsFirstBirthday.connect(signer).balanceOf(signer.address)
    expect(balance.toNumber()).to.equal(1)
  })

  it("mint token and check balance", async function () {
    const signer = whitelisted[1]
    const tx = await mintToken(signer, 2)

    const receipt = await tx.wait()
    const tokenId = getTokenIdFromReceipt(receipt)

    const balance = await DOGsFirstBirthday.connect(signer).balanceOf(signer.address)
    expect(balance.toNumber()).to.equal(1)

    const uri = await DOGsFirstBirthday.connect(signer).tokenURI(tokenId)
    expect(uri).to.equal(baseURIs[2])
  });

  it("should reject due to not being whitelisted", async function () {
    const invalidAccount = notWhitelisted[0]
    await expect(mintToken(invalidAccount, 0)).to.be.revertedWith('Not in whitelisted addresses')
  })

  it("should not allow transfer", async function () {
    const signer = whitelisted[2]
    const tx = await mintToken(signer, 3)

    const receipt = await tx.wait()
    const tokenId = getTokenIdFromReceipt(receipt)
    await expect(DOGsFirstBirthday.connect(signer)["safeTransferFrom(address,address,uint256)"](signer.address, whitelisted[3].address, tokenId)).to.be.revertedWith("not allowed transfer");
  });

});
