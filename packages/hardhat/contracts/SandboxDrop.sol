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
    mapping(address => bool) availbleTokens;

    constructor() {
        _disableInitializers();
    }

    function initialize(address _pixelAddress) public initializer {
        __Ownable_init();
        pixelAddress = _pixelAddress;
    }

    function deposit(
        address _erc1155Address,
        uint256 _fractionId,
        uint256 _amount
    ) public onlyOwner {
        // must deposit at least one token
        require(_amount > 0, "Amount must be greater than 0");

        // must have sufficient balance
        require(
            IERC1155(_erc1155Address).balanceOf(msg.sender, _fractionId) >=
                _amount,
            "Insufficient balance"
        );

        // transfer tokens to contract
        IERC1155(_erc1155Address).safeTransferFrom(
            msg.sender,
            address(this),
            _fractionId,
            _amount,
            ""
        );
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
