const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture, impersonateAccount, setBalance } = require("@nomicfoundation/hardhat-network-helpers");
const nounletAbi = require("./abis/nounlet.json")
const fractionalVaultAbi = require("./abis/fractional-vault-factory.json")
const ferc1155Abi = require("./abis/fractional-erc1155.json")

describe("Nounlet Wrapper", function() {

    const nounletMainnetAddress = "0x13901ecbBc74242795Af3a3c9880a319D78796Eb"
    const fractionalVaultAddress = "0x04BB19E64d2C2D92dC84efF75bD0AB757625A5f2"
    const fractionalFERC1155Address = "0xb2469a7dd9E154c97b99b33E88196f7024F2979e"
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

    async function wrapNounlet({wrapperContract, id, ownerAddress}) {
        const nounletContract = await getNounletOwner(id)
        const nounletWrapper = wrapperContract.connect(nounletContract.signer)

        // give the nounlet owner a large ETH balance
        await setBalance(nounletContract.signer.address, ethers.BigNumber.from(100).pow(18))

        // make sure the nounlet owner is as expected
        expect(nounletContract.signer.address).eq(ownerAddress)

        // give approval to wrapper contract to move our nounlet
        await nounletContract.setApprovalForAll(wrapperContract.address, true);

        // wrap nounlet
        await wrapperContract.connect(nounletContract.signer).wrap(id);

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

        return {nounletContract, wrapperContract: nounletWrapper}
    }

    async function deployWrapper() {
        return loadFixture(deployContractFixture)
    }

    async function unwrapNounlet({id, wrapperContract, nounletContract}) {
        await wrapperContract.unwrap(id);
        // check balance for ERC1155 (should have been sent from wrapper back to owner of the wNounlet315)
        // wrapper contract should not own this token anymore
        expect(await nounletContract.balanceOf(wrapperContract.address, id)).eq(0)
        // initial owner should have the nounlet returned
        expect(await nounletContract.ownerOf(id)).eq(nounletContract.signer.address)

        // checking balance of token that has been burned should revert
        await expect(wrapperContract.ownerOf(id)).to.be.revertedWith("ERC721: invalid token ID")
        await expect(wrapperContract.tokenURI(id)).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token")
    }

    it("Wraps nounlet #69", async function() {
        const {contract: wrapperContract} = await deployWrapper()
        await wrapNounlet({...testNounlet69, wrapperContract})
    })

    it("Wraps Nounlet #70", async function() {
        const {contract: wrapperContract} = await deployWrapper()
        await wrapNounlet({...testNounlet70, wrapperContract})
    })

    it("Wraps Nounlet #69 & #70", async function() {
        const {contract: wrapperContract} = await deployWrapper()
        await wrapNounlet({wrapperContract, ...testNounlet69})
        await wrapNounlet({wrapperContract, ...testNounlet70})
        expect(await wrapperContract.totalSupply()).eq(2)
        expect(await wrapperContract.isTokenWrapped(testNounlet69.id)).eq(true)
        expect(await wrapperContract.isTokenWrapped(testNounlet70.id)).eq(true)
    })

    it("Wraps Nounlet #69 then unwraps it", async function() {
        const {contract: wrapperContract} = await deployWrapper()
        const {nounletContract, wrapperContract: nounletWrapper} = await wrapNounlet({...testNounlet69, wrapperContract})
        expect(await wrapperContract.totalSupply()).eq(1)
        await unwrapNounlet({
            id: testNounlet69.id, 
            wrapperContract: nounletWrapper, 
            nounletContract
        })
        expect(await wrapperContract.totalSupply()).eq(0)
    })

    it("Wraps Nounlet #69 and fractionalizes it on Fractional.art", async function() {
        const fractionsCount = 6969
        const {contract: wrapperContract} = await deployWrapper()
        const {nounletContract, wrapperContract: nounletWrapper} = await wrapNounlet({...testNounlet69, wrapperContract})
        const fractionalVault = (new ethers.Contract(fractionalVaultAddress, fractionalVaultAbi))
            .connect(nounletContract.signer)

        // let fractional vault transfer our wrapped nounlet
        await nounletWrapper.setApprovalForAll(fractionalVault.address, true)

        // mint a vault with our wNounlet315
        const tx = await fractionalVault.mint(nounletWrapper.address, testNounlet69.id, fractionsCount)
        const receipt = await tx.wait()
        const mintEvent = receipt.events.filter(event => event.event === "Mint")[0]
        const { token, id, fractionId, vault, vaultId } = mintEvent.args

        expect(token).eq(nounletWrapper.address)
        expect(id).eq(testNounlet69.id)
        
        const baseMainnetUri = "https://mainnet-api.fractional.art/fractions"
        const ferc1155Contract = new ethers.Contract(fractionalFERC1155Address, ferc1155Abi, ethers.provider)
        expect(await ferc1155Contract.uri(fractionId)).eq(baseMainnetUri  + `/${fractionId}`)
    })

    it("Wraps Nounlet #69 and attacker tries to unwrap", async function() {
        const {contract: wrapperContract, signers} = await deployWrapper()
        await wrapNounlet({...testNounlet69, wrapperContract})
        const badGuyWrapperContract = wrapperContract.connect(signers[4])
        await expect(badGuyWrapperContract.unwrap(testNounlet69.id)).to.be.revertedWith('You do not own this wrapped Nounlet #315.')
    })

    it("Trys to wrap a Nounlet without owning a Nounlet", async function() {
        const {contract: wrapperContract, owner} = await deployWrapper()
        await expect(wrapperContract.wrap(testNounlet69.id)).to.be.revertedWith('You do not own this Nounlet #315.')
    })
})