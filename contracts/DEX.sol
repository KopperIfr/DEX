// SPDX-License-Identifier:MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error Insuficient_Balance(address sender, uint256 amount);
error Unsoported_Token(address token, address sender);
error Same_Token(address tokenA, address tokenB);

contract DEX 
{
    uint256 public rate;

    function swap(address _tokenA, address _tokenB, address _to, uint256 _amount) public 
    {
        // If tokenA and tokenB are same revert..
        if(_tokenA == _tokenB) revert Same_Token(_tokenA, _tokenB);

        // Declaring tokens..
        IERC20 tokenA = IERC20(_tokenA);
        IERC20 tokenB = IERC20(_tokenB);

        // Let's supose totalSupply is the liquidity of each token..
        rate = (tokenA.totalSupply() / tokenB.totalSupply());
        // tokenA(10.000), tokenB(8.500), rate = 1,17
        uint256 amountToReceive = rate * _amount;
        // _amount = 1.000

        // Checking balance of sender..
        if(tokenA.balanceOf(msg.sender) < _amount) revert Insuficient_Balance(msg.sender, _amount);

        // Checking balance receiver..
        if(tokenB.balanceOf(_to) < amountToReceive) revert Insuficient_Balance(msg.sender, amountToReceive);

        // Transfering tokens..
        tokenA.transferFrom(msg.sender, _to, _amount);
        tokenB.transferFrom(_to, msg.sender, amountToReceive);
    }

}