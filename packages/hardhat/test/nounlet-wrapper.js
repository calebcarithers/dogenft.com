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

    it("Wraps nounlet", async function() {
        const {contract, owner} = await loadFixture(deployContractFixture)
        const nounletOwnerAddress = "0xaF46dc96bd783E683fD0EFeF825e6110165b8f9E"
        await impersonateAccount(nounletOwnerAddress)
        const nounletOwnerSigner = await ethers.getSigner(nounletOwnerAddress)

        const nounletId = 69;
        const nounletContract = new ethers.Contract(nounletMainnetAddress, nounletAbi).connect(nounletOwnerSigner)
        expect(await nounletContract.balanceOf(nounletOwnerAddress, nounletId)).eq(1)

        const tokenURI = await nounletContract.uri(nounletId)
        const contractURI = await nounletContract.contractURI();

        // give approval to wrapper contract to move our nounlet
        const tx = await nounletContract.setApprovalForAll(contract.address, true);  
        await tx.wait()      

        // wrap nounlet
        const wrapperContract = contract.connect(nounletOwnerSigner)
        await wrapperContract.wrap(nounletId, {gasLimit: 2100000});

        // check tokenURI and contractURI
        const wrappedTokenURI = await contract.tokenURI(nounletId);
        const wrappedContractURI = await contract.contractURI();

        expect(tokenURI).to.eq(wrappedTokenURI)
        expect(contractURI).to.eq(wrappedContractURI)

        // previous nounlet owner should be owner of wrapped nounlet
        expect(await wrapperContract.ownerOf(nounletId)).to.eq(nounletOwnerAddress)
        // wrapper contract should be owner of the nounlet
        expect(await nounletContract.balanceOf(contract.address, nounletId)).to.eq(1)
    })
})