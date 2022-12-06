const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { generateMerkleRoot } = require("../utils/merkle")

describe("Rainbow Pixel Claim", function() {

    async function deployContractFixture() {
        const amountToWhitelist = 10;

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
        const {merkleRoot, merkleTree} = generateMerkleRoot(whitelistedSigners.map(account => account.address))
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

    async function safeTransferPixels({
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

    async function mintPixels({
        pixelContract,
        signer,
        count
    }) {
        const contract = pixelContract.connect(signer)
        for (let i = 0; i < count; i++) {
            await contract.mint()
        }
    }

    const expectPixelBalance = async ({pixelContract, signer, balance}) => {
        const actualBalance = await pixelContract.connect(signer).balanceOf(signer.address)
        expect(actualBalance).to.equal(balance) 
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
        await safeTransferPixels({pixelContract, rainbowContract, owner, count: pixelsToMint})
        expect(await pixelContract.balanceOf(rainbowContract.address)).to.equal(pixelsToMint)
    })

    it("Should claim all tokens", async () => {
        const {rainbowContract, pixelContract, merkleTree, whitelistedSigners, owner} = await loadFixture(deployContractFixture)
        await safeTransferPixels({pixelContract, rainbowContract, owner, count: 15})
        for (const signer of whitelistedSigners) {
            await claim({signer, merkleTree, rainbowContract})
            await expect(claim({signer, merkleTree, rainbowContract})).to.be.revertedWith("Address has already claimed");
        }
    })

    it("Should deposit pixels and withdraw pixels", async () => {
        const {rainbowContract, pixelContract, owner} = await loadFixture(deployContractFixture)
        const tokenIds = []
        const count = 10;
        await mintPixels({pixelContract, signer: owner, count})
        for (let i = 0; i < count; i++) {
            tokenIds.push(i)
        }

        // set approval to transfer pixels
        await pixelContract.setApprovalForAll(rainbowContract.address, true)

        // check balances before transfer
        expectPixelBalance({pixelContract, signer: owner, balance: count})
        expectPixelBalance({pixelContract, signer: rainbowContract, balance: 0})


        // deposit pixels
        await rainbowContract.connect(owner).deposit(tokenIds)

        // check balances after deposit
        expectPixelBalance({pixelContract, signer: owner, balance: 0})
        expectPixelBalance({pixelContract, signer: rainbowContract, balance: count})

    })

    it("Should deposit and withdraw pixels", async () => {
        const {rainbowContract, owner, pixelContract} = await loadFixture(deployContractFixture)
        const amountToMint = 10
        const tokenIds = []
        for (let i = 0; i < amountToMint; i++) {
            tokenIds.push(i)
        }

        await mintPixels({pixelContract, signer: owner, count: amountToMint})
        expectPixelBalance({pixelContract, signer: owner, balance: amountToMint})

        await pixelContract.setApprovalForAll(rainbowContract.address, true)
        await rainbowContract.connect(owner).deposit(tokenIds)

        expectPixelBalance({pixelContract, signer: owner, balance: 0})
        expectPixelBalance({pixelContract, signer: rainbowContract, balance: amountToMint})

        const pixelIds = await rainbowContract.getPixelIds();
        await rainbowContract.connect(owner).withdraw(pixelContract.address, owner.address, pixelIds)

        expectPixelBalance({pixelContract, signer: owner, balance: amountToMint})
        expectPixelBalance({pixelContract, signer: rainbowContract, balance: 0})
    })
})