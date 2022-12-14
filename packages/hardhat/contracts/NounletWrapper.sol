// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts/interfaces/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NounletWrapper is
    Initializable,
    ERC721Upgradeable,
    OwnableUpgradeable,
    ERC721BurnableUpgradeable,
    IERC1155ReceiverUpgradeable
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
        uint256 expectedBalance = 1;
        require(balance != expectedBalance, "You do not own this nounlet");
        IERC1155MetadataURI(nounletAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            expectedBalance,
            ""
        );
        _mint(msg.sender, _tokenId);
    }

    function unwrap(uint256 _tokenId) public {
        address owner = IERC721(address(this)).ownerOf(_tokenId);
        require(msg.sender == owner, "You do not own this wrapped nounlet.");
        _burn(_tokenId);
        IERC1155MetadataURI(nounletAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId,
            1,
            ""
        );
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
}
