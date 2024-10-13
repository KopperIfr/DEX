// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

error Exceded_Max_Supply(uint256 supply, uint256 max_supply, address minter);
error Only_Admin(address caller, address admin);
error Amount_Required(address sender, uint256 amount);

contract TokenFactory is ERC20 
{
    uint256 public immutable maxSupply;
    address public admin;

    constructor
    (
        uint256 _initialSupply, 
        uint256 _maxSupply,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) 
    {
        // Checking if initial supply doesnt overflow max supply..
        if(_initialSupply > _maxSupply) 
        {
            revert Exceded_Max_Supply(_initialSupply, _maxSupply, msg.sender);
        }

        // Minting initial supply of tokens..
        _mint(msg.sender, _initialSupply);

        // Setting max supply..
        maxSupply = _maxSupply;

        // Setting admin..
        admin = msg.sender;
    }


    function mint(uint256 _amount, address _to) public onlyAdmin
    {
        
        // Amount must be greater than 0..
        if(_amount <= 0) revert Amount_Required(msg.sender, _amount);

        // Cant exceed max supply..
        if(totalSupply() + _amount > maxSupply) {
            revert Exceded_Max_Supply(totalSupply() + _amount, maxSupply, admin);
        }

        // Minting new tokens..
        _mint(msg.sender, _amount);

        // If _to address is given..
        if(_to != address(0)) {
            _transfer(admin, _to, _amount);
        }
    }

    function burn(uint256 _amount) public onlyAdmin
    {
        // Burning tokens..
        _burn(admin, _amount);
    }

    function setAdmin(address _admin) public onlyAdmin
    {
        // Setting new admin..
        admin = _admin;
    }

    modifier onlyAdmin 
    {
        if(msg.sender != admin) {
            revert Only_Admin(msg.sender, admin);
        }
        _;
    }
}