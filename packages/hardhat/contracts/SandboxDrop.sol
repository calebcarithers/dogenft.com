// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

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
    mapping(uint256 => bool) private tokenIdAvailable;

    constructor() {
        _disableInitializers();
    }

    function initialize(address _pixelAddress, address _sandboxAddress)
        public
        initializer
    {
        __Ownable_init();
        pixelAddress = _pixelAddress;
        sandboxAddress = _sandboxAddress;
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
        if (!tokenIdAvailable[_tokenId]) {
            tokenIdAvailable[_tokenId] = true;
            availableTokenIds.push(_tokenId);
        }
    }

    function claim() public {
        require(isClaimOpen, "Claim is not open");
    }

    function psuedoRandom(uint256 _mod) private view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) %
            _mod;
    }

    function setIsClaimOpen(bool _isOpen) public onlyOwner {
        isClaimOpen = _isOpen;
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
