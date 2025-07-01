// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Pausable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract MyToken is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable,
    ERC721Burnable
{
    using Strings for uint256;
    /**
     *  _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     * see safeMint()
     */
    string private _baseTokenURI;
    uint256 private _nextTokenId = 1;
    uint256 public constant _price = 0.001 ether;
    uint256 public constant _maxSupply = 9;

    // modifier onlyWhenNotPause() {
    //     require(!paused(), "Contract is paused");
    //     _;
    // }

    constructor(
        string memory baseURI
    ) ERC721("MyToken", "MTK") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Safe mint function.
     * @return The token ID of the minted token.
     */
    function safeMint() public payable whenNotPaused returns (uint256) {
        require(_nextTokenId <= _maxSupply, "Max supply reached");
        require(msg.value >= _price, "Insufficient balance");
        uint256 tokenId = _nextTokenId++;
        // msg.sender 是一个全局变量，代表当前调用合约函数的账户地址
        // 在这里 msg.sender 是调用 safeMint() 函数的用户地址
        // 当用户调用 safeMint() 时，他们的以太坊地址就会被记录为 msg.sender
        _safeMint(msg.sender, tokenId);
        string memory uri = string(
            abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json")
        );
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    /**
     * @dev Returns all token IDs of the owner.
     * @param owner The address of the owner to query.
     * @return An array containing all token IDs of the owner.
     */
    function tokensOfOwner(
        address owner
    ) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(address(owner), i);
        }
        return tokensId;
    }

    function getBaseTokenURI() public view returns (string memory) {
        return _baseTokenURI;
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function hasPermission(
        address spender,
        uint256 tokenId
    ) external view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner ||
            isApprovedForAll(owner, spender) ||
            getApproved(tokenId) == spender);
    }
}
