const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");
const { loadFixture, impersonateAccount } = require("@nomicfoundation/hardhat-network-helpers");
const { generateMerkleRoot } = require("../utils/merkle")
const nounletAbi = require("./abis/nounlet.json")

describe("Nounlet Wrapper", function() {

    const nounletMainnetAddress = "0x13901ecbBc74242795Af3a3c9880a319D78796Eb"

    async function deployContractFixture() {
        const signers = await ethers.getSigners();
        const owner = signers[0];
        const factory = await ethers.getContractFactory("NounletWrapper");
        const contract = await factory.deploy(nounletMainnetAddress);
        await contract.deployed()
        console.log(`nounlet wrapper contract deployed with address: ${contract.address}`)
        return {
            signers,
            owner,
            contract
        }
    }

    async function getNounletOwner(id) {
        const contract = new ethers.Contract(nounletMainnetAddress, nounletAbi, ethers.provider)
        const address = await contract.ownerOf(id);
        console.log("hit", address)
        await impersonateAccount(address)
        const signer = await ethers.getSigner(address)

        // owner should only have single nounlet as only 1 of each ID exists
        expect(await contract.balanceOf(address, id)).eq(1)
        return contract.connect(signer)
    }

    it("Wraps nounlet", async function() {
        const {contract: wrapperContractOwner, owner} = await loadFixture(deployContractFixture)
        const testNounlet = {id: 69, ownerAddress: "0xaF46dc96bd783E683fD0EFeF825e6110165b8f9E"}
        const nounletContract = await getNounletOwner(testNounlet.id)
        expect(nounletContract.signer.address).eq(testNounlet.ownerAddress)

        const tokenURI = await nounletContract.uri(testNounlet.id)
        const contractURI = await nounletContract.contractURI();

        // give approval to wrapper contract to move our nounlet
        const tx = await nounletContract.setApprovalForAll(wrapperContractOwner.address, true);  
        await tx.wait()      

        // wrap nounlet
        await wrapperContractOwner.connect(nounletContract.signer).wrap(testNounlet.id, {gasLimit: 2100000});

        // check tokenURI and contractURI
        const wrappedTokenURI = await wrapperContractOwner.tokenURI(testNounlet.id);
        const wrappedContractURI = await wrapperContractOwner.contractURI();

        expect(tokenURI).to.eq(wrappedTokenURI)
        expect(contractURI).to.eq(wrappedContractURI)

        // previous nounlet owner should be owner of wrapped nounlet
        expect(await wrapperContractOwner.ownerOf(testNounlet.id)).to.eq(nounletContract.signer.address)
        // wrapper contract should be owner of the nounlet
        expect(await nounletContract.balanceOf(wrapperContractOwner.address, testNounlet.id)).to.eq(1)
    })
})