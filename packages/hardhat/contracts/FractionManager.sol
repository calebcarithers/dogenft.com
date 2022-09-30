// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract FractionManager is Initializable, OwnableUpgradeable, IERC1155ReceiverUpgradeable {
    using ERC165Checker for address;
    address public pixelAddress;
    mapping(address => mapping(uint256 => bool)) public pixelClaimed;
    mapping(address => bool) public isClaimOpen;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _pixelAddress) initializer public {
        __Ownable_init();
        pixelAddress = _pixelAddress;
    }

    function deposit(address _erc1155Address, uint256 _fractionId, uint256 _amount) public onlyOwner {
        require(_amount > 0, "FractionalManager: Amount must be greater than 0");
        require(IERC1155(_erc1155Address).balanceOf(msg.sender, _fractionId) >= _amount, "Fractional: Insufficient balance");
        IERC1155(_erc1155Address).safeTransferFrom(msg.sender, address(this), _fractionId, _amount, "");
    }

    function claim(address _erc1155Address, uint256 _fractionId, uint256 _pixelId) public {
        require(isClaimOpen[_erc1155Address], "Claim is not open");
        require(!pixelClaimed[_erc1155Address][_pixelId], "Pixel already claimed");
        require(IERC721(pixelAddress).ownerOf(_pixelId) == msg.sender, "Not pixel owner");
        require(IERC1155(_erc1155Address).balanceOf(address(this), _fractionId) >= 1, "Insufficient balance");
        IERC1155(_erc1155Address).safeTransferFrom(address(this), msg.sender, _fractionId, 1, "");
        pixelClaimed[_erc1155Address][_pixelId] = true;
    }

    function hasPixelClaimed(address _erc1155Address, uint256 _pixelId) public view returns (bool) {
        return pixelClaimed[_erc1155Address][_pixelId];
    }

    function withdraw(address _erc1155Address, uint256 _fractionId) public onlyOwner {
        uint256 balance = IERC1155(_erc1155Address).balanceOf(address(this), _fractionId);
        IERC1155(_erc1155Address).safeTransferFrom(address(this), msg.sender, _fractionId, balance, "");
    }

    function setIsTokenClaimable(address _erc1155Address, bool canClaim) public onlyOwner {
        isClaimOpen[_erc1155Address] = canClaim;
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
        address ,
        address ,
        uint256[] calldata ,
        uint256[] calldata ,
        bytes calldata
    ) external virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) external virtual override view returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}
