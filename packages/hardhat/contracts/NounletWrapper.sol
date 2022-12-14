// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/interfaces/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "hardhat/console.sol";

interface INounlet is IERC1155MetadataURI {
    function contractURI() external view returns (string memory);
}

contract NounletWrapper is
    ERC721,
    ERC721Burnable,
    ERC1155Holder
{
    address private nounletAddress;
    // nounlets are an ERC1155 with distinct token IDs ascending from 1-
    // only a single nounlet can be wrapped and unwrapped at a time
    uint256 private allowedDepositAmount = 1;
    mapping(uint256 => bool) public isTokenWrapped;

    constructor(address _nounletAddress) ERC721("WrappedNounlet315", "wNounlet315") {
        nounletAddress = _nounletAddress;
    }

    function wrap(uint256 _tokenId) public {
        uint256 balance = INounlet(nounletAddress).balanceOf(
            msg.sender,
            _tokenId
        );
        require(balance == allowedDepositAmount, "You do not own this nounlet");
        require(!isTokenWrapped[_tokenId], "This token is already wrapped");
        isTokenWrapped[_tokenId] = true;
        // grab the nounlet
        INounlet(nounletAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId,
            allowedDepositAmount,
            ""
        );
        // mint wrapped nounlet to caller
        _safeMint(msg.sender, _tokenId);
    }

    function unwrap(uint256 _tokenId) public {
        require(msg.sender == this.ownerOf(_tokenId), "You do not own this wrapped nounlet.");
        require(isTokenWrapped[_tokenId], "This token is not wrapped");
        isTokenWrapped[_tokenId] = false;
        // return the nounlet
        INounlet(nounletAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _tokenId,
            allowedDepositAmount,
            ""
        );
        // burn 721 wrapped nounlet
        _burn(_tokenId);
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

    function contractURI() public view returns (string memory) {
        return INounlet(nounletAddress).contractURI();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
