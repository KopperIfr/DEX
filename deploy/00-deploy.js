
const { 
    INITIAL_SUPPLY_TOKEN_A, 
    INITIAL_SUPPLY_TOKEN_B,
    MAX_SUPPLY_TOKEN_A,
    MAX_SUPPLY_TOKEN_B,
    LOCAL_BLOCKCHAIN
} = require('../hardhat-config-helper.js');
const { deployToken, deployDEX } = require('../utils/deployments.js');
const { verify } = require('../utils/verify');
const { network, run } = require('hardhat');

module.exports = async ({getNamedAccounts, deployments}) => {
    const { tokenAadmin, tokenBadmin, dexDeployer } = await getNamedAccounts();
    const { deploy } = deployments;

    // Deploying token A..
    const tokenA = await deployToken(deploy, tokenAadmin, 'TokenA', 'TKA', INITIAL_SUPPLY_TOKEN_A, MAX_SUPPLY_TOKEN_A);

    // Deploying token B..
    const tokenB = await deployToken(deploy, tokenAadmin, 'TokenB', 'TKB', INITIAL_SUPPLY_TOKEN_B, MAX_SUPPLY_TOKEN_B,);

    // Deploying DEX..
    const DEX = await deployDEX(deploy, tokenAadmin);

    if(!LOCAL_BLOCKCHAIN.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        verify(run, tokenA.address, [deploy, tokenAadmin, 'TokenA', 'TKA', INITIAL_SUPPLY_TOKEN_A, MAX_SUPPLY_TOKEN_A]);
        verify(run, tokenB.address, [deploy, tokenAadmin, 'TokenB', 'TKB', INITIAL_SUPPLY_TOKEN_B, MAX_SUPPLY_TOKEN_B]);
        verify(run, DEX.address, [deploy, tokenAadmin]);
    }

    return { tokenA, tokenB, DEX }

}

module.exports.tags = ['all', 'DEX', 'Token'];