const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");



describe("Sandbox drop", function() {
    let merkleTree;
    let signers, owner, whitelistedSigners, nonWhiteListedSigners;
    let sandboxContract, erc1155Contract;
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
        const contract = sandboxContract.connect(signer);
        const proof = merkleTree.getHexProof(keccak256(signer.address));
        return contract.claim(proof)
    }

    before(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];
        whitelistedSigners = signers.slice(1, amountToWhitelist);
        nonWhiteListedSigners = signers.slice(amountToWhitelist, signers.length)

        erc1155Contract = await deployContract("MockFraction");

        const factory = await ethers.getContractFactory("SandboxDrop");
        merkleTree = generateMerkleTree(whitelistedSigners.map(account => account.address))
        const merkleRoot = merkleTree.getHexRoot()
        console.log("got merkle root:", merkleRoot)
        sandboxContract = await upgrades.deployProxy(factory, [erc1155Contract.address, merkleRoot])
        await sandboxContract.deployed()
    })

    it("Should set approval for sandbox contract to transfer erc1155s", async function() {
        await erc1155Contract.setApprovalForAll(sandboxContract.address, true);
        expect(await erc1155Contract.isApprovedForAll(owner.address, sandboxContract.address)).to.equal(true);
    })

    it("Should deposit erc1155s to contract", async function() {
        const tokenIdToBalance = {
            [100001]: 3,
            [100023]: 3,
            [103]: 3
        }

        for (const tokenId of Object.keys(tokenIdToBalance)) {
            const balance = tokenIdToBalance[tokenId]
            await erc1155Contract.mint(tokenId, balance)
            expect((await erc1155Contract.balanceOf(owner.address, tokenId)).toNumber()).to.equal(balance)

            await sandboxContract.deposit(tokenId, balance)
            expect((await erc1155Contract.balanceOf(owner.address, tokenId)).toNumber()).to.equal(0)
            expect((await erc1155Contract.balanceOf(sandboxContract.address, tokenId)).toNumber()).to.equal(balance)
        }
    })

    it("Should claim all tokens", async () => {
        for (const signer of whitelistedSigners) {
            await claim(signer)
            await expect(claim(signer)).to.be.revertedWith("Address has already claimed");
        }
    })

    it("Should stop claim", async () => {
        await sandboxContract.setIsClaimOpen(false);
        await expect(claim(owner)).to.be.revertedWith("Claim is not open");
        await sandboxContract.setIsClaimOpen(true);
    })

    it("Should require user to be whitelisted", async () => {
        const tokenId = 10000
        const amount = 10
        await erc1155Contract.mint(tokenId, amount)
        await sandboxContract.deposit(tokenId, amount)
        await expect(claim(nonWhiteListedSigners[0])).to.be.revertedWith("Not in whitelisted addresses")
    })
})