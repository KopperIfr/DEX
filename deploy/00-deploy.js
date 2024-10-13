
const { 
    INITIAL_SUPPLY_TOKEN_A, 
    INITIAL_SUPPLY_TOKEN_B,
    MAX_SUPPLY_TOKEN_A,
    MAX_SUPPLY_TOKEN_B
} = require('../hardhat-config-helper.js');

const { deployToken, deployDEX } = require('../utils/deployments.js');

module.exports = async ({getNamedAccounts, deployments}) => {
    const { tokenAadmin, tokenBadmin, dexDeployer } = await getNamedAccounts();
    const { deploy } = deployments;

    // Deploying token A..
    const tokenA = await deployToken(deploy, tokenAadmin, 'TokenA', 'TKA', INITIAL_SUPPLY_TOKEN_A, MAX_SUPPLY_TOKEN_A);

    // Deploying token B..
    const tokenB = await deployToken(deploy, tokenBadmin, 'TokenB', 'TKB', INITIAL_SUPPLY_TOKEN_B, MAX_SUPPLY_TOKEN_B,);

    // Deploying DEX..
    const DEX = await deployDEX(deploy, dexDeployer, tokenA.address, tokenB.address);

    return { tokenA, tokenB, DEX }

}

module.exports.tags = ['all', 'DEX', 'Token'];