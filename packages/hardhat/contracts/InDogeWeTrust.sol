// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract InDogeWeTrust is Initializable, ERC721Upgradeable, PausableUpgradeable, OwnableUpgradeable, ERC721BurnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    string public _baseTokenURI;
    uint256 public totalSupply;
    mapping(address => bool) public whitelistClaimed;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint256 _supply) initializer public {
        __ERC721_init("In Doge We Trust", "IDWT");
        __Pausable_init();
        __Ownable_init();
        __ERC721Burnable_init();
        totalSupply = _supply;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint() public payable {
        // don't allow those who have claimed to claim more than once
        require(!whitelistClaimed[msg.sender], "Address already claimed");

        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId + 1 < totalSupply, "Total supply exceeded");

        // mark address as claimed
        whitelistClaimed[msg.sender] = true;

        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function hasClaimed(address account) public view returns (bool) {
        return whitelistClaimed[account];
    }

    function isSupplyAvailable() public view returns (bool) {
        return _tokenIdCounter.current() + 1 < totalSupply;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    whenNotPaused
    override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _baseURI();
    }
}
