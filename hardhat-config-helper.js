const {ethers} = require('hardhat');

const MAX_SUPPLY_TOKEN_A = ethers.parseUnits("1000000", 18);
const INITIAL_SUPPLY_TOKEN_A = ethers.parseUnits("1000000", 18);
const MAX_SUPPLY_TOKEN_B = ethers.parseUnits("1000000", 18);
const INITIAL_SUPPLY_TOKEN_B = ethers.parseUnits("1000000", 18);
const LOCAL_BLOCKCHAIN = ['localhost', 'hardhat'];


module.exports = {
    MAX_SUPPLY_TOKEN_A,
    MAX_SUPPLY_TOKEN_B,
    INITIAL_SUPPLY_TOKEN_A,
    INITIAL_SUPPLY_TOKEN_B,
    LOCAL_BLOCKCHAIN
}