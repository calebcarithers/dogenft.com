const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");

describe("Fractional Contract", function () {
  let mockPixelContract, signers;
  let fractionalManager;
  let fractionalContract;

  // const getTokenIdFromReceipt = (receipt) => {
  //   return BigNumber.from(receipt.logs[0].topics[3]).toNumber()
  // }

  before(async () => {
    signers = await ethers.getSigners()

    // This is only for mock pixel contract.
    console.log("\ndeploying mockPixelContract")
    const MockPixelContract = await ethers.getContractFactory("MockPixel");
    mockPixelContract = await upgrades.deployProxy(MockPixelContract, []);
    await mockPixelContract.deployed();

    // console.log("mockPixelContract deployed to:", mockPixelContract.address);
    console.log("\ndeploying mock Fractional contract")
    const FractionalFactory = await ethers.getContractFactory("MockFraction");
    fractionalContract = await FractionalFactory.deploy();
    await fractionalContract.deployed();
    console.log("mockFractionalContract deployed to:", fractionalContract.address);

    await fractionalContract.mint(1, 100);
    await fractionalContract.mint(2, 100);

    console.log("\ndeploying fractionalManager")
    const FractionManagerFactory = await ethers.getContractFactory("FractionManager");
    fractionalManager = await upgrades.deployProxy(FractionManagerFactory, [mockPixelContract.address]);
    await fractionalManager.deployed();
    console.log("FractionalManager deployed to:", fractionalManager.address);
  })

 it("Should deposit Fraction NFTs", async function () {
    await fractionalContract.setApprovalForAll(fractionalManager.address, true);
    await fractionalManager.deposit(fractionalContract.address, 1,  100);
    expect(await fractionalContract.balanceOf(fractionalManager.address, 1)).to.equal(100);
  });

  it("Should claim Fraction NFTs", async function () {
    await mockPixelContract.mint();
    await fractionalManager.claim(fractionalContract.address, 1, 1);
    expect(await fractionalContract.balanceOf(fractionalManager.address, 1)).to.equal(99);
    expect(await fractionalContract.balanceOf(signers[0].address, 1)).to.equal(1);
  });

  it("Should not claim more than one ERC1155 per a pixel", async function () {
    await expect(fractionalManager.claim(fractionalContract.address, 1, 1)).to.be.revertedWith("Pixel already claimed");
  });

  it("Should withdraw all ERC1155", async function () {
    await expect(fractionalManager.connect(signers[1]).withdraw(fractionalContract.address, 1)).to.be.revertedWith("Ownable: caller is not the owner");

    await fractionalManager.withdraw(fractionalContract.address, 1);
    expect(await fractionalContract.balanceOf(fractionalManager.address, 1)).to.equal(0);
    expect(await fractionalContract.balanceOf(signers[0].address, 1)).to.equal(100);
  });
   
 
});
