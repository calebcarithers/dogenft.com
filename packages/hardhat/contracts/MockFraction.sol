// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MockFraction is ERC1155 {

    constructor () ERC1155(""){
    }

    function mint(uint256 id, uint256 amount) public {
        _mint(msg.sender, id, amount, "");
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }
}