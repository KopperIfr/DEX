const { 
    INITIAL_SUPPLY_TOKEN_A, 
    INITIAL_SUPPLY_TOKEN_B,
    MAX_SUPPLY_TOKEN_A,
    MAX_SUPPLY_TOKEN_B,
    LOCAL_BLOCKCHAIN
} = require('../hardhat-config-helper.js');

const { verify } = require('../utils/verify');
const { network, run } = require('hardhat');
const {deployToken, deployDEX} = require('../utils/deployments.js');

module.exports = async ({getNamedAccounts, deployments}) => {
    
    // Getting necessary data..
    const { deployerTokenA, deployerTokenB, dexDeployer } = await getNamedAccounts();
    const { deploy } = deployments;

    // Deploying contracts..
    const TokenA = await deployToken(deploy, deployerTokenA, 'TokenA', 'TKA', INITIAL_SUPPLY_TOKEN_A, MAX_SUPPLY_TOKEN_A);
    const TokenB = await deployToken(deploy, deployerTokenB, 'TokenB', 'TKB', INITIAL_SUPPLY_TOKEN_B, MAX_SUPPLY_TOKEN_B);
    const DEX = await deployDEX(deploy, dexDeployer);


    // If we are on Sepolia, we verify them on etherscan..
    if(!LOCAL_BLOCKCHAIN.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(run, TokenA.address, [INITIAL_SUPPLY_TOKEN_A, MAX_SUPPLY_TOKEN_A,'TokenA', 'TKA']);
        await verify(run, TokenB.address, [INITIAL_SUPPLY_TOKEN_B, MAX_SUPPLY_TOKEN_B,'TokenB', 'TKB']);
        await verify(run, DEX.address, []);
    }

    // Returning the contracts..
    return { TokenA, TokenB, DEX }

}


module.exports.tags = ['all', 'DEX', 'Token'];