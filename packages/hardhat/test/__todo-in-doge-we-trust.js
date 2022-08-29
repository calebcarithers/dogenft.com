const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");
const {BigNumber} = require("ethers");
const {keccak256} = require("ethers/lib/utils");
const {MerkleTree} = require("merkletreejs");

describe("In Doge We Trust", function () {
  let mockPixelContract, signers, whitelisted, tree;
  let InDogeWeTrust;
  let tokenId;

  // const mintToken = async (signer) => {
  //   const contract = await mockPixelContract.connect(signer)
  //   const proof = tree.getHexProof(keccak256(signer.address))
  //   return contract.safeMint(proof)
  // }

  const getTokenIdFromReceipt = (receipt) => {
    return BigNumber.from(receipt.logs[0].topics[3]).toNumber()
  }

  before(async () => {
    signers = await ethers.getSigners()
    whitelisted = signers.slice(0, 5)

    // This is only for mock pixel contract.
    // const leaves = whitelisted.map(account => keccak256(account.address))
    // tree = new MerkleTree(leaves, keccak256, { sort: true })
    // const merkleRoot = tree.getHexRoot()


    console.log("\ndeploying mockPixelContract")
    const MockPixelContract = await ethers.getContractFactory("MockPixel");
    mockPixelContract = await upgrades.deployProxy(MockPixelContract, []);
    await mockPixelContract.deployed();
    console.log("mockPixelContract deployed to:", mockPixelContract.address);

    console.log("\ndeploying InDogeWeTrust")
    const InDogeWeTrustFactory = await ethers.getContractFactory("InDogeWeTrust");
    InDogeWeTrust = await upgrades.deployProxy(InDogeWeTrustFactory, [mockPixelContract.address]);
    await InDogeWeTrust.deployed();
  })

  it("mint token and allow only one token", async function () {
    const signer = whitelisted[1]
    const tx = await mockPixelContract.connect(signer).mint()

    const receipt = await tx.wait()
    tokenId = getTokenIdFromReceipt(receipt)

    await InDogeWeTrust.connect(signer).safeMint(tokenId);
    expect(await InDogeWeTrust.balanceOf(signer.address)).to.equal(1);

    await expect(InDogeWeTrust.connect(signer).safeMint(tokenId + 1)).to.be.revertedWith("Address has already claimed");
  });

  it("Should check claimed for wallet and pixel id", async function () {
    expect(await InDogeWeTrust.hasPixelClaimed(tokenId)).to.equal(true);
    expect(await InDogeWeTrust.hasPixelClaimed(tokenId + 1)).to.equal(false);
    expect(await InDogeWeTrust.hasClaimed(whitelisted[1].address)).to.equal(true);
  });

  it("mint token from pixel id only one time", async function () {
    mockPixelContract["safeTransferFrom(address,address,uint256)"](whitelisted[1].address, whitelisted[2].address, tokenId)
    await expect(InDogeWeTrust.connect(whitelisted[2]).safeMint(tokenId)).to.be.revertedWith("Pixel already used to claimed");
  });

   it("should allow pixel owner to mint", async function () {
    const tx = await mockPixelContract.mint()

    const receipt = await tx.wait()
    tokenId = getTokenIdFromReceipt(receipt)

    await expect(InDogeWeTrust.connect(whitelisted[2]).safeMint(tokenId)).to.be.revertedWith("You do not own this pixel");
  });
});
