const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");

describe("Fractional Contract", function () {
  let mockPixelContract, signers;
  let fractionalManager;
  let mockERC1155Contract;

  before(async () => {
    signers = await ethers.getSigners()

    const MockPixelContract = await ethers.getContractFactory("MockPixel");
    mockPixelContract = await upgrades.deployProxy(MockPixelContract, []);
    await mockPixelContract.deployed();
    console.log('Mock Pixel deployed')

    const ERC1155Factory = await ethers.getContractFactory("MockFraction");
    mockERC1155Contract = await ERC1155Factory.deploy();
    await mockERC1155Contract.deployed();
    console.log('Mock ERC1155 deployed')

    await mockERC1155Contract.mint(1, 100);
    await mockERC1155Contract.mint(2, 100);

    const FractionManagerFactory = await ethers.getContractFactory("FractionManager");
    fractionalManager = await upgrades.deployProxy(FractionManagerFactory, [mockPixelContract.address]);
    await fractionalManager.deployed();
    console.log('Fractional Manager deployed')
  })

 it("Should deposit Fraction NFTs", async function () {
    await mockERC1155Contract.setApprovalForAll(fractionalManager.address, true);
    await fractionalManager.deposit(mockERC1155Contract.address, 1,  100);
    expect(await mockERC1155Contract.balanceOf(fractionalManager.address, 1)).to.equal(100);
  });

  it("Should not be able to claim yet", async function() {
    await expect(fractionalManager.claim(mockERC1155Contract.address, 1, 1)).to.be.revertedWith("Claim is not open");
  })

  it("Should claim Fraction NFTs", async function () {
    await mockPixelContract.mint();
    await mockPixelContract.mint();
    await fractionalManager.setIsTokenClaimable(mockERC1155Contract.address, true);
    await fractionalManager.claim(mockERC1155Contract.address, 1, 1);
    // fractional manager should have one less token
    expect(await mockERC1155Contract.balanceOf(fractionalManager.address, 1)).to.equal(99);
    // signer should have been sent a token
    expect(await mockERC1155Contract.balanceOf(signers[0].address, 1)).to.equal(1);
  });

  it("Should not claim more than one ERC1155 per a pixel", async function() {
    await expect(fractionalManager.claim(mockERC1155Contract.address, 1, 1)).to.be.revertedWith("Pixel already claimed");
  });

  it("Should not be able to claim if caller is not holding a pixel", async function() {
    const newContract = await fractionalManager.connect(signers[1])
    await expect(newContract.claim(mockERC1155Contract.address, 1, 2)).to.be.revertedWith("Not pixel owner")
  })

  // it("Should withdraw all ERC1155", async function () {
  //   await expect(fractionalManager.connect(signers[1]).withdraw(mockERC1155Contract.address, 1)).to.be.revertedWith("Ownable: caller is not the owner");
  //
  //   await fractionalManager.withdraw(mockERC1155Contract.address, 1);
  //   expect(await mockERC1155Contract.balanceOf(fractionalManager.address, 1)).to.equal(0);
  //   expect(await mockERC1155Contract.balanceOf(signers[0].address, 1)).to.equal(100);
  // });
});
