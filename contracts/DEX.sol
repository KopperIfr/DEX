// SPDX-License-Identifier:MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error Insuficient_Balance(address sender, uint256 amount);

contract DEX 
{
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public rate;

    constructor(address _tokenA, address _tokenB, uint256 _rate) 
    {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        rate = _rate;
    }

    function swapAtoB(uint256 _amount, address _walletTokenB) public 
    {
        // Calculatin tokenB amount..
        uint256 amountB = _amount * rate;
        
        // Checking balance of wallet tokenA..
        if(tokenA.balanceOf(msg.sender) < _amount) revert Insuficient_Balance(msg.sender, _amount);

        // Checking balance of wallet tokenB..
        if(tokenB.balanceOf(_walletTokenB) < amountB) revert Insuficient_Balance(_walletTokenB, _amount);

        // Transfering token A..
        tokenA.transferFrom(msg.sender, _walletTokenB, _amount);

        // Transfering token B..
        tokenB.transferFrom(_walletTokenB, msg.sender, amountB);
    }

        function swapBtoA(uint256 _amount, address _walletTokenA) public 
    {
        // Calculatin tokenB amount..
        uint256 amountB = _amount / rate;
        
        // Checking balance of wallet tokenB..
        if(tokenB.balanceOf(msg.sender) < _amount) revert Insuficient_Balance(msg.sender, _amount);

        // Checking balance of wallet tokenA..
        if(tokenA.balanceOf(_walletTokenA) < amountB) revert Insuficient_Balance(_walletTokenA, _amount);

        // Transfering token A..
        tokenB.transferFrom(msg.sender, _walletTokenA, _amount);

        // Transfering token B..
        tokenA.transferFrom(_walletTokenA, msg.sender, amountB);
    }

}