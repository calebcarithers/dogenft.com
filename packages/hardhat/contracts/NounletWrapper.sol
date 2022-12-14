// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts/interfaces/IERC1155MetadataURI.sol";

contract NounletWrapper is
    ERC721Upgradeable,
    OwnableUpgradeable,
    ERC721BurnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdCounter;
    address private nounletAddress;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _nounletAddress) public initializer {
        __ERC721_init("WrappedNounlet", "wNounlet");
        __Ownable_init();
        __ERC721Burnable_init();
        nounletAddress = _nounletAddress;
    }

    function wrap(uint256 _tokenId) public {
        uint256 balance = IERC1155MetadataURI(nounletAddress).balanceOf(
            msg.sender,
            _tokenId
        );
        require(balance > 0, "You do not have this nounlet");
        IERC1155MetadataURI(nounletAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            balance,
            ""
        );
        _mint(msg.sender, _tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return IERC1155MetadataURI(nounletAddress).uri(_tokenId);
    }

    function unwrap() public {}
}
