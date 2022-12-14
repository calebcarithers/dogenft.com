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

    async function wrapNounlet({nounletContract, wrapperContract, id}) {
        // give approval to wrapper contract to move our nounlet
        await nounletContract.setApprovalForAll(wrapperContract.address, true);

        // wrap nounlet
        await wrapperContract.connect(nounletContract.signer).wrap(id, {gasLimit: 2100000});

        // assert uri/tokenURI & contractURI
        const uri = await nounletContract.uri(id)
        const contractURI = await nounletContract.contractURI();
        const wrappedTokenURI = await wrapperContract.tokenURI(id);
        const wrappedContractURI = await wrapperContract.contractURI();
        expect(uri).to.eq(wrappedTokenURI)
        expect(contractURI).to.eq(wrappedContractURI)

        // previous nounlet owner should be owner of wrapped nounlet
        expect(await wrapperContract.ownerOf(id)).to.eq(nounletContract.signer.address)
        // wrapper contract should be owner of the nounlet
        expect(await nounletContract.balanceOf(wrapperContract.address, id)).to.eq(1)
    }

    it("Wraps nounlet", async function() {
        const testNounlet = {id: 69, ownerAddress: "0xaF46dc96bd783E683fD0EFeF825e6110165b8f9E"}
        const {contract: wrapperContract} = await loadFixture(deployContractFixture)
        const nounletContract = await getNounletOwner(testNounlet.id)
        expect(nounletContract.signer.address).eq(testNounlet.ownerAddress)

        await wrapNounlet({nounletContract, wrapperContract, id: testNounlet.id})
    })
})