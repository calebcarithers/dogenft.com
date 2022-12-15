const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture, impersonateAccount } = require("@nomicfoundation/hardhat-network-helpers");
const nounletAbi = require("./abis/nounlet.json")
const fractionalVaultAbi = require("./abis/fractional-vault-factory.json")

describe("Nounlet Wrapper", function() {

    const nounletMainnetAddress = "0x13901ecbBc74242795Af3a3c9880a319D78796Eb"
    const fractionalVaultAddress = "0x04BB19E64d2C2D92dC84efF75bD0AB757625A5f2"
    const testNounlet69 = {id: 69, ownerAddress: "0xaF46dc96bd783E683fD0EFeF825e6110165b8f9E"}
    const testNounlet70 = {id: 70, ownerAddress: "0x65657E65292C3Dfd4c67bceC2d22FC44DE87702E"}
    // https://ethereum.stackexchange.com/questions/107461/hardhat-invalidinputerror-sender-doesnt-have-enough-funds-to-send-tx
    const gasLimit = 2_100_000

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
        await wrapperContract.connect(nounletContract.signer).wrap(id, {gasLimit});

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
        // returns wrapper contract and nounlet contract connected to nounlet owner signer
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
        return {nounletContract, wrapperContract: _wrapper.connect(nounletContract.signer)}
    }

    async function unwrapNounlet({id, wrapperContract, nounletContract}) {
        await wrapperContract.unwrap(id, {gasLimit});
        // check balance for ERC1155 (should have been sent from wrapper back to owner of the wNounlet315)
        // wrapper contract should not own this token anymore
        expect(await nounletContract.balanceOf(wrapperContract.address, id)).eq(0)
        // initial owner should have the nounlet returned
        expect(await nounletContract.ownerOf(id)).eq(nounletContract.signer.address)

        // checking balance of token that has been burned should revert
        await expect(wrapperContract.ownerOf(id)).to.be.revertedWith("ERC721: invalid token ID")
        await expect(wrapperContract.tokenURI(id)).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token")
    }

    // it("Wraps nounlet #69", async function() {
    //     await wrapNounletDeployMaybe(testNounlet69)
    // })

    // it("Wraps Nounlet #70", async function() {
    //     await wrapNounletDeployMaybe(testNounlet70)
    // })

    // it("Wraps Nounlet #69 & #70", async function() {
    //     const {contract: wrapperContract} = await loadFixture(deployContractFixture)
    //     await wrapNounletDeployMaybe({wrapperContract, ...testNounlet69})
    //     await wrapNounletDeployMaybe({wrapperContract, ...testNounlet70})
    //     expect(await wrapperContract.isTokenWrapped(testNounlet69.id)).eq(true)
    //     expect(await wrapperContract.isTokenWrapped(testNounlet70.id)).eq(true)
    // })

    // it("Wraps Nounlet #69 then unwraps it", async function() {
    //     const {nounletContract, wrapperContract} = await wrapNounletDeployMaybe(testNounlet69)
    //     await unwrapNounlet({
    //         id: testNounlet69.id, 
    //         wrapperContract: wrapperContract.connect(nounletContract.signer), 
    //         nounletContract
    //     })
    // })

    it("Wraps Nounlet #69 and fractionalizes it on Fractional.art", async function() {
        const fractionsCount = 6969
        const {nounletContract, wrapperContract} = await wrapNounletDeployMaybe(testNounlet69)
        const fractionalVault = (new ethers.Contract(fractionalVaultAddress, fractionalVaultAbi))
            .connect(nounletContract.signer)
        // let fractional vault transfer our wrapped nounlet
        const tx = await wrapperContract.setApprovalForAll(fractionalVault.address, true)
        await fractionalVault.mint(wrapperContract.address, testNounlet69.id, fractionsCount, {gasLimit})
    })
})