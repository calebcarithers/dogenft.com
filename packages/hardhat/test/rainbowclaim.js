const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Rainbow", function() {

    async function deployContractFixture() {
        const amountToWhitelist = 10;

        const generateMerkleTree = (addresses) => {
            const leaves = addresses.map(address => keccak256(address));
            return new MerkleTree(leaves, keccak256, { sort: true })
        }

        const deployContract = async (name) => {
            const factory = await ethers.getContractFactory(name);
            const contract = await factory.deploy();
            await contract.deployed();
            console.log(`Deloyed ${name} to ${contract.address}`);
            return contract;
        }

        const signers = await ethers.getSigners();
        const owner = signers[0];
        const whitelistedSigners = signers.slice(1, amountToWhitelist);
        const nonWhiteListedSigners = signers.slice(amountToWhitelist, signers.length)

        const pixelContract = await deployContract("MockPixel");

        const factory = await ethers.getContractFactory("RainbowClaim");
        const merkleTree = generateMerkleTree(whitelistedSigners.map(account => account.address))
        const merkleRoot = merkleTree.getHexRoot()
        console.log("got merkle root:", merkleRoot)
        
        const rainbowContract = await upgrades.deployProxy(factory, [pixelContract.address, merkleRoot])
        await rainbowContract.deployed()
        console.log(`rainbow contract deployed with adderss: ${rainbowContract.address}`)

        return {
            rainbowContract,
            pixelContract,
            signers,
            owner,
            whitelistedSigners,
            nonWhiteListedSigners,
            merkleTree,
            merkleRoot
        }
    }

    async function depositPixels({
        pixelContract,
        rainbowContract,        
        owner,
        count
    }) {
        for (let i = 0; i < count; i++) {
            await pixelContract.mint()
            await pixelContract["safeTransferFrom(address,address,uint256)"](owner.address, rainbowContract.address, i);
            expect(await rainbowContract.pixelIds(i)).to.equal(i)
        }
    }

    const claim = async ({signer, merkleTree, rainbowContract}) => {
        const contract = rainbowContract.connect(signer);
        const proof = merkleTree.getHexProof(keccak256(signer.address));
        return contract.claim(proof)
    }

    it("Read the pixel contract address", async function() {
        const {rainbowContract, pixelContract} = await loadFixture(deployContractFixture)
        expect(await rainbowContract.pixelAddress()).to.equal(pixelContract.address);
    })

    it("Should mint and deposit pixels", async function() {
        const {pixelContract,  owner, rainbowContract} = await loadFixture(deployContractFixture)
        const pixelsToMint = 15
        await depositPixels({pixelContract, rainbowContract, owner, count: pixelsToMint})
        expect(await pixelContract.balanceOf(rainbowContract.address)).to.equal(pixelsToMint)
    })

    it("Should claim all tokens", async () => {
        const {rainbowContract, pixelContract, merkleTree, whitelistedSigners, owner} = await loadFixture(deployContractFixture)
        await depositPixels({pixelContract, rainbowContract, owner, count: 15})
        for (const signer of whitelistedSigners) {
            await claim({signer, merkleTree, rainbowContract})
            await expect(claim({signer, merkleTree, rainbowContract})).to.be.revertedWith("Address has already claimed");
        }
    })

    // it("Should stop claim", async () => {
    //     await sandboxContract.setIsClaimOpen(false);
    //     await expect(claim(owner)).to.be.revertedWith("Claim is not open");
    //     await sandboxContract.setIsClaimOpen(true);
    // })

    // it("Should require user to be whitelisted", async () => {
    //     const tokenId = 10000
    //     const amount = 10
    //     await erc1155Contract.mint(tokenId, amount)
    //     await sandboxContract.deposit(tokenId, amount)
    //     await expect(claim(nonWhiteListedSigners[0])).to.be.revertedWith("Not in whitelisted addresses")
    // })
})