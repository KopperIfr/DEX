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
        
        // Checking balance..
        if(tokenA.balanceOf(msg.sender) < _amount) revert Insuficient_Balance(msg.sender, _amount);

        // Transfering token A..
        bool success = tokenA.transferFrom(msg.sender, _walletTokenB, _amount);
        if(!success) revert('No enough');

        // Transfering token B..
        tokenB.transferFrom(_walletTokenB, msg.sender, amountB);
    }

    function swapAtoB2(uint256 _amount, address _walletTokenB) public {
    // Verificar que el usuario A tiene suficiente balance de Token A
    require(tokenA.balanceOf(msg.sender) >= _amount, "Insufficient Token A balance");

    // Verificar que el usuario B tiene suficiente balance de Token B
    uint256 amountB = _amount * rate;
    require(tokenB.balanceOf(_walletTokenB) >= amountB, "Insufficient Token B balance");

    // Transferir Token A de Usuario A (msg.sender) a Usuario B (_walletTokenB)
    require(tokenA.transferFrom(msg.sender, _walletTokenB, _amount), "Token A transfer failed");

    // Transferir Token B de Usuario B (_walletTokenB) a Usuario A (msg.sender)
    require(tokenB.transferFrom(_walletTokenB, msg.sender, amountB), "Token B transfer failed");
}

}