const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");
const { loadFixture, impersonateAccount } = require("@nomicfoundation/hardhat-network-helpers");
const { generateMerkleRoot } = require("../utils/merkle")
const nounletAbi = require("./abis/nounlet.json")

describe("Nounlet Wrapper", function() {

    const nounletMainnetAddress = "0x13901ecbBc74242795Af3a3c9880a319D78796Eb"
    const testNounlet69 = {id: 69, ownerAddress: "0xaF46dc96bd783E683fD0EFeF825e6110165b8f9E"}
    const testNounlet70 = {id: 70, ownerAddress: "0x65657E65292C3Dfd4c67bceC2d22FC44DE87702E"}

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

    async function wrapNounletDeployMaybe({id, ownerAddress, wrapperContract}) {
        let _wrapper
        if (wrapperContract) {
            _wrapper = wrapperContract
        } else {
            const {contract} = await loadFixture(deployContractFixture)
            _wrapper = contract
        }
        const nounletContract = await getNounletOwner(id)
        expect(nounletContract.signer.address).eq(ownerAddress)
        await wrapNounlet({nounletContract, wrapperContract: _wrapper, id: id})
        return {nounletContract, wrapperContract: _wrapper}
    }

    async function unwrapNounlet({id, wrapperContract, nounletContract}) {
        await wrapperContract.unwrap(id);
        // check balance for ERC1155 (should have been sent from wrapper back to owner of the wNounlet315)
        // wrapper contract should not own this token anymore
        expect(nounletContract.balanceOf(wrapperContract.address, id)).eq(0)
        // initial owner should have the nounlet returned
        expect(nounletContract.ownerOf(id)).eq(nounletContract.signer.address)

        // check balance of ERC721
        expect(wrapperContract.ownerOf(id)).eq(0)
    }

    it("Wraps nounlet #69", async function() {
        await wrapNounletDeployMaybe(testNounlet69)
    })

    it("Wraps Nounlet #70", async function() {
        await wrapNounletDeployMaybe(testNounlet70)
    })

    it("Wraps Nounlet #69 & #70", async function() {
        const {contract: wrapperContract} = await loadFixture(deployContractFixture)
        await wrapNounletDeployMaybe({wrapperContract, ...testNounlet69})
        await wrapNounletDeployMaybe({wrapperContract, ...testNounlet70})
        expect(await wrapperContract.isTokenWrapped(testNounlet69.id)).eq(true)
        expect(await wrapperContract.isTokenWrapped(testNounlet70.id)).eq(true)
    })

    it("Wraps Nounlet #69 then unwraps it", async function() {
        const {nounletContract, wrapperContract} = await wrapNounletDeployMaybe(testNounlet69)
        await unwrapNounlet({id: testNounlet69.id, wrapperContract: wrapperContract.connect(nounletContract.signer), nounletContract})
    })
})