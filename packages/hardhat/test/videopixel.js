const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");
const {BigNumber} = require("ethers");
const {keccak256} = require("ethers/lib/utils");
const {MerkleTree} = require("merkletreejs");

describe("In Doge We Trust", function () {
  let IDWT, signers, whitelisted, notWhitelisted, tree;
  let videoPixelContract;
  const tokenURI = "ipfs://bafkreialqmooagbx5i3pao4wtr35t5v7dxwhma44znfuea5o4xf6uibcbm"

  const mintToken = async (signer) => {
    const contract = await IDWT.connect(signer)
    const proof = tree.getHexProof(keccak256(signer.address))
    return contract.safeMint(proof)
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


    console.log("\ndeploying IDWT")
    const doge = await ethers.getContractFactory("InDogeWeTrust");
    IDWT = await upgrades.deployProxy(doge, [whitelisted.length, merkleRoot]);
    await IDWT.deployed();
    console.log("IDWT deployed to:", IDWT.address);
    console.log("setting base tokenURI to:", tokenURI)
    await IDWT.setBaseURI(tokenURI)

    console.log("\ndeploying videoPixel")
    const VideoPixelFactory = await ethers.getContractFactory("VideoPixel");
    videoPixelContract = await upgrades.deployProxy(VideoPixelFactory, [IDWT.address]);
    await videoPixelContract.deployed();

  })

  it("mint token from pixel id only one time", async function () {
    const signer = whitelisted[1]
    const tx = await mintToken(signer)

    const receipt = await tx.wait()
    const tokenId = getTokenIdFromReceipt(receipt)

    await videoPixelContract.connect(signer).safeMint(tokenId);
    expect(await videoPixelContract.balanceOf(signer.address)).to.equal(1);

    await expect(videoPixelContract.connect(signer).safeMint(tokenId + 1)).to.be.revertedWith("Address already claimed");
  });
});
