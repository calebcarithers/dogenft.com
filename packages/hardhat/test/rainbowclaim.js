const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");



describe("Rainbow", function() {
    let merkleTree;
    let signers, owner, whitelistedSigners, nonWhiteListedSigners;
    let rainbowContract, pixelContract;
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

    const claim = async (signer) => {
        const contract = rainbowContract.connect(signer);
        const proof = merkleTree.getHexProof(keccak256(signer.address));
        return contract.claim(proof)
    }

    before(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];
        whitelistedSigners = signers.slice(1, amountToWhitelist);
        nonWhiteListedSigners = signers.slice(amountToWhitelist, signers.length)

        pixelContract = await deployContract("MockPixel");

        const factory = await ethers.getContractFactory("RainbowClaim");
        merkleTree = generateMerkleTree(whitelistedSigners.map(account => account.address))
        const merkleRoot = merkleTree.getHexRoot()
        console.log("got merkle root:", merkleRoot)
        rainbowContract = await upgrades.deployProxy(factory, [pixelContract.address, merkleRoot])
        await rainbowContract.deployed()
    })

    it("Read the pixel contract address", async function() {
        expect(await rainbowContract.pixelAddress()).to.equal(pixelContract.address);
    })

    it("Should mint and deposit pixels", async function() {
        const pixelsToMint = 15;
        for (let i = 0; i < pixelsToMint; i++) {
            await pixelContract.mint()
            await pixelContract["safeTransferFrom(address,address,uint256)"](owner.address, rainbowContract.address, i);
        }

        const balance = await pixelContract.balanceOf(rainbowContract.address)

        console.log(balance)
        // expect(await pixelContract.balanceOf(rainbowContract.address)).to.equal(pixelsToMint)

        // const tokenIdToBalance = {
        //     [100001]: 3,
        //     [100023]: 3,
        //     [103]: 3
        // }

        // for (const tokenId of Object.keys(tokenIdToBalance)) {
        //     const balance = tokenIdToBalance[tokenId]
        //     await erc1155Contract.mint(tokenId, balance)
        //     expect((await erc1155Contract.balanceOf(owner.address, tokenId)).toNumber()).to.equal(balance)

        //     await sandboxContract.deposit(tokenId, balance)
        //     expect((await erc1155Contract.balanceOf(owner.address, tokenId)).toNumber()).to.equal(0)
        //     expect((await erc1155Contract.balanceOf(sandboxContract.address, tokenId)).toNumber()).to.equal(balance)
        // }
    })

    // it("Should claim all tokens", async () => {
    //     for (const signer of whitelistedSigners) {
    //         await claim(signer)
    //         await expect(claim(signer)).to.be.revertedWith("Address has already claimed");
    //     }
    // })

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