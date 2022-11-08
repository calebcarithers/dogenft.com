// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract SandboxDrop is
    Initializable,
    OwnableUpgradeable,
    IERC1155ReceiverUpgradeable
{
    struct SandboxNFT {
        address _address;
        uint256 _amount;
    }

    address public pixelAddress;
    address public sandboxAddress;
    bool public isClaimOpen;
    uint256[] private availableTokenIds;
    mapping(uint256 => bool) private isTokenIdAvailable;
    mapping(address => bool) public whitelistClaimed;
    bytes32 public merkleRoot;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _pixelAddress,
        address _sandboxAddress,
        bytes32 _merkleRoot
    ) public initializer {
        __Ownable_init();
        pixelAddress = _pixelAddress;
        sandboxAddress = _sandboxAddress;
        merkleRoot = _merkleRoot;
        isClaimOpen = true;
    }

    function deposit(uint256 _tokenId, uint256 _amount) public onlyOwner {
        // must deposit at least one token
        require(_amount > 0, "Amount must be greater than 0");

        // must have sufficient balance
        require(
            IERC1155(sandboxAddress).balanceOf(msg.sender, _tokenId) >= _amount,
            "Insufficient balance"
        );

        // transfer tokens to contract
        IERC1155(sandboxAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            _amount,
            ""
        );

        // mark token as availble
        if (!isTokenIdAvailable[_tokenId]) {
            isTokenIdAvailable[_tokenId] = true;
            availableTokenIds.push(_tokenId);
        }
    }

    function claim(bytes32[] calldata _merkleProof) public {
        // claim must be open
        require(isClaimOpen, "Claim is not open");

        // can only claim once
        require(!whitelistClaimed[msg.sender], "Address has already claimed");

        // require user to be whitelisted to claim
        require(
            this.isAddressInMerkleTree(_merkleProof, msg.sender),
            "Not in whitelisted addresses"
        );

        // get random index from available token ids
        uint256 index = psuedoRandom(availableTokenIds.length);

        // get the token id
        uint256 tokenId = availableTokenIds[index];

        // token ID must be availble
        require(isTokenIdAvailable[tokenId], "Token ID is not available");

        // contract must be holding at least one of these tokens
        uint256 contractBalance = IERC1155(sandboxAddress).balanceOf(
            address(this),
            tokenId
        );
        uint256 amountToSpend = 1;
        require(
            contractBalance >= amountToSpend,
            "Contract is not holding this token"
        );

        // send token to caller
        IERC1155(sandboxAddress).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId,
            amountToSpend,
            ""
        );

        // mark address as claimed
        whitelistClaimed[msg.sender] = true;

        // remove this tokenid from available tokens
        if (contractBalance == 1) {
            availableTokenIds[index] = availableTokenIds[
                availableTokenIds.length - 1
            ];
            availableTokenIds.pop();
            isTokenIdAvailable[tokenId] = false;
        }
    }

    function withdraw(uint256 _tokenId) public onlyOwner {
        uint256 balance = IERC1155(sandboxAddress).balanceOf(
            address(this),
            _tokenId
        );
        IERC1155(sandboxAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId,
            balance,
            ""
        );
    }

    function isAddressInMerkleTree(
        bytes32[] calldata _merkleProof,
        address _address
    ) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(_address));
        return MerkleProof.verify(_merkleProof, merkleRoot, leaf);
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function setIsClaimOpen(bool _isOpen) public onlyOwner {
        isClaimOpen = _isOpen;
    }

    function psuedoRandom(uint256 _mod) private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % _mod;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId)
        external
        view
        virtual
        override
        returns (bool)
    {
        return interfaceId == type(IERC165).interfaceId;
    }
}
