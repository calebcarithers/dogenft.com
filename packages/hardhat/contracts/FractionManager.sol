// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract FractionManager is Initializable, PausableUpgradeable, OwnableUpgradeable, IERC1155ReceiverUpgradeable {
    using ERC165Checker for address;
    address public pixelAddress;
    address public fractionAddress;
    uint256 fractionId;
    // mapping(address => bool) public whitelistClaimed;
    mapping(uint256 => bool) public pixelClaimed;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _pixelAddress, address _fractionAddress, uint256 _fractionId) initializer public {
        __Pausable_init();
        __Ownable_init();
        pixelAddress = _pixelAddress;
        fractionAddress = _fractionAddress;
        fractionId = _fractionId;
    }

    function deposit(uint256 _amount) public onlyOwner {
        require(_amount > 0, "FractionalManager: Amount must be greater than 0");
        require(IERC1155(fractionAddress).balanceOf(msg.sender, fractionId) >= _amount, "Fractional: Insufficient balance");
        IERC1155(fractionAddress).safeTransferFrom(msg.sender, address(this), fractionId, _amount, "");
    }

    function claim(uint256 _pixelId) public whenNotPaused {
        require(!pixelClaimed[_pixelId], "Pixel already claimed");
        require(IERC721(pixelAddress).ownerOf(_pixelId) == msg.sender, "Not pixel owner");
        require(IERC1155(fractionAddress).balanceOf(address(this), fractionId) >= 1, "Insufficient balance");
        // ** should check balance
        IERC1155(fractionAddress).safeTransferFrom(address(this), msg.sender, fractionId, 1, "");
        pixelClaimed[_pixelId] = true;
    }


    // function hasClaimed(address _whitelist) public view returns (bool) {
    //     return whitelistClaimed[_whitelist];
    // }

    function hasPixelClaimed(uint256 _pixelId) public view returns (bool) {
        return pixelClaimed[_pixelId];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() public onlyOwner {
        uint256 balance = IERC1155(fractionAddress).balanceOf(address(this), fractionId);
        IERC1155(fractionAddress).safeTransferFrom(address(this), msg.sender, fractionId, balance, "");
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
