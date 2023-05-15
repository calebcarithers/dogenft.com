// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract KabosuMemorial is ERC1155 {
    event Message(address indexed from, string message);

    constructor() ERC1155("KabosuMemorial") {}

    function mintWithMessage(string calldata message) public {
        _mint(msg.sender, 0, 1, "");
        emit Message(msg.sender, message);
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }
}
