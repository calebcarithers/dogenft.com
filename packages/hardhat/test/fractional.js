const {expect} = require("chai");
const {ethers, upgrades} = require("hardhat");

describe("Fractional Contract", function () {
  let mockPixelContract, signers;
  let fractionalManager;
  let mockERC1155Contract;
  const mockERC1155TokenId = 1
  const mockERC1155TokenCountToDeposit = 100
  let lastPixelIdUsedToClaim = 1

  let erc1155LeftInManager = mockERC1155TokenCountToDeposit

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

    // mint two erc1155 tokens
    await mockERC1155Contract.mint(mockERC1155TokenId, mockERC1155TokenCountToDeposit);

    const FractionManagerFactory = await ethers.getContractFactory("FractionManager");
    fractionalManager = await upgrades.deployProxy(FractionManagerFactory, [mockPixelContract.address]);
    await fractionalManager.deployed();
    console.log('Fractional Manager deployed')
  })

 it("Should deposit Fraction NFTs", async function () {
    await mockERC1155Contract.setApprovalForAll(fractionalManager.address, true);
    await fractionalManager.deposit(mockERC1155Contract.address, mockERC1155TokenId,  mockERC1155TokenCountToDeposit);
    expect(await mockERC1155Contract.balanceOf(fractionalManager.address, mockERC1155TokenId)).to.equal(mockERC1155TokenCountToDeposit);
  });

  it("Should not be able to claim yet", async function() {
    await expect(fractionalManager.claim(mockERC1155Contract.address, mockERC1155TokenId, lastPixelIdUsedToClaim)).to.be.revertedWith("Claim is not open");
  })

  it("Should claim Fraction NFTs", async function () {
    // mint two pixels
    await mockPixelContract.mint();
    await mockPixelContract.mint();

    // allow claiming for the token
    await fractionalManager.setIsTokenClaimable(mockERC1155Contract.address, mockERC1155TokenId, true);

    lastPixelIdUsedToClaim += 1;
    await fractionalManager.claim(mockERC1155Contract.address, mockERC1155TokenId, lastPixelIdUsedToClaim);
    erc1155LeftInManager -= 1;

    // fractional manager should have one less token
    expect(await mockERC1155Contract.balanceOf(fractionalManager.address, 1)).to.equal(erc1155LeftInManager);
    // signer should have been sent a token
    expect(await mockERC1155Contract.balanceOf(signers[0].address, 1)).to.equal(1);
  });

  it("Should not claim more than one ERC1155 per a pixel", async function() {
    await expect(fractionalManager.claim(mockERC1155Contract.address, mockERC1155TokenId, lastPixelIdUsedToClaim)).to.be.revertedWith("Pixel already claimed");
  });

  it("Should not be able to claim if caller is not holding a pixel", async function() {
    const newContract = await fractionalManager.connect(signers[3])
    await expect(newContract.claim(mockERC1155Contract.address, mockERC1155TokenId, lastPixelIdUsedToClaim - 1)).to.be.revertedWith("Not pixel owner")
  })

  it("Should allow user to claim as many fractions as pixels they hold", async function() {
    const localSigner = signers[2]
    const fractional = await fractionalManager.connect(localSigner);
    const pixelContract = await mockPixelContract.connect(localSigner)
    const count = 20;
    let expectedFractionBalance = 0

    for (let i = 0; i <= count; i++) {
      lastPixelIdUsedToClaim += 1
      expectedFractionBalance += 1
      await pixelContract.mint()
      await fractional.claim(mockERC1155Contract.address, mockERC1155TokenId, lastPixelIdUsedToClaim)
      erc1155LeftInManager -= 1;
      expect(await mockERC1155Contract.balanceOf(localSigner.address, mockERC1155TokenId)).to.equal(expectedFractionBalance)
    }
  })

  it("Should only let the owner withdraw fractions", async function() {
    await expect(fractionalManager.connect(signers[1]).withdraw(mockERC1155Contract.address, 1)).to.be.revertedWith("Ownable: caller is not the owner");
  })

  it("Should withdraw all ERC1155", async function () {
    await fractionalManager.withdraw(mockERC1155Contract.address, mockERC1155TokenId);
    expect(await mockERC1155Contract.balanceOf(fractionalManager.address, mockERC1155TokenId)).to.equal(0);
    expect(await mockERC1155Contract.balanceOf(signers[0].address, 1)).to.equal(erc1155LeftInManager + 1);
  });

  it("Cannot call initialize again", async function() {
    await expect(fractionalManager.initialize("0xA26461Fcf53f3E21cde8c902CA6e8e6ba9Def62f")).to.be.revertedWith("Initializable: contract is already initialized")
  })

  it("Should run tests for new token ID", async function() {
    const newTokenId = mockERC1155TokenId + 1
    // mint new erc1155 token
    await mockERC1155Contract.mint(newTokenId, mockERC1155TokenCountToDeposit);
    expect(await mockERC1155Contract.balanceOf(signers[0].address, newTokenId)).to.equal(mockERC1155TokenCountToDeposit);

    // deposit tokens
    await fractionalManager.deposit(mockERC1155Contract.address, newTokenId, mockERC1155TokenCountToDeposit)
    expect(await mockERC1155Contract.balanceOf(signers[0].address, newTokenId)).to.equal(0);

    // should not allow claim until owner approves
    await expect(fractionalManager.claim(mockERC1155Contract.address, newTokenId, lastPixelIdUsedToClaim)).to.be.revertedWith("Claim is not open");

    // approve claim for token
    fractionalManager.setIsTokenClaimable(mockERC1155Contract.address, newTokenId, true)

    // old user is able to claim with existing erc721
    await fractionalManager.claim(mockERC1155Contract.address, newTokenId, 1)

    expect(await mockERC1155Contract.balanceOf(fractionalManager.address, newTokenId)).to.equal(mockERC1155TokenCountToDeposit - 1);
    expect(await mockERC1155Contract.balanceOf(signers[0].address, newTokenId)).to.equal(1);

    await fractionalManager.withdraw(mockERC1155Contract.address, newTokenId)
    expect(await mockERC1155Contract.balanceOf(signers[0].address, newTokenId)).to.equal(mockERC1155TokenCountToDeposit);
  })
});
