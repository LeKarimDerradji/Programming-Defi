// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Exchange {
    address public tokenAddress;
    
    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid Token Address");
        tokenAddress = _tokenAddress;
    }

    /**
    *@notice to provide liquidity
    *@dev this functions serves for liquidity providers 
    *@param _tokenAmmount is the ammount of tokens we provide.
    * The token then gets casted as of type contract-IERC20 so that it inherits its methods
    * Then the ammount of token entered in the paramater, gets transfered from the sender address to the contract
    * to get manipulated in the future.
    * */
    function addLiquidity(uint256 _tokenAmmount) public payable {
        IERC20 token = IERC20(tokenAddress); 
        token.transferFrom(msg.sender, address(this), _tokenAmmount);
    }

    // Getters
    function getReserve() public view returns (uint256) {
        return IERC20(tokenAddress).balanceOf((address(this)));
    }
}

