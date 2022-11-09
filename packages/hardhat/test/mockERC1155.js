const { ethers, upgrades } = require("hardhat");
const { keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs");
const { expect } = require("chai");



describe("Mock ERC1155", function() {
    let signers, owner
    let erc1155Contract;


    const deployContract = async (name) => {
        const factory = await ethers.getContractFactory(name);
        const contract = await factory.deploy();
        await contract.deployed();
        console.log(`Deloyed ${name} to ${contract.address}`);
        return contract;
    }

    before(async () => {
        signers = await ethers.getSigners();
        owner = signers[0];

        erc1155Contract = await deployContract("MockERC1155");
    })

    it("Set URIS", async function() {
        const tokensToMint = {
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980227")]: {
                balance: 15,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/3.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980229")]: {
                balance: 15,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/5.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980225")]: {
                balance: 15,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/1.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980230")]: {
                balance: 15,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/6.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980226")]: {
                balance: 10,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/2.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980224")]: {
                balance: 11,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/0.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980231")]: {
                balance: 18,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/7.json"
            },
            [ethers.BigNumber.from("67031862187656528318453779715773770542811847030081758913959388841425388980232")]: {
                balance: 1,
                uri: "ipfs://bafybeifcpajxmh3q3utpjol4fd5pdkyt3ajetyz6d5gjyr74qt57qdsps4/8.json"
            }
        }

        for (const tokenId of Object.keys(tokensToMint)) {
            const balance = tokensToMint[tokenId].balance
            const uri = tokensToMint[tokenId].uri
            await erc1155Contract.mint(tokenId, balance);
            await erc1155Contract.setUri(tokenId, uri)
            expect(await erc1155Contract.uri(tokenId)).to.equal(uri)
        }
    })
})