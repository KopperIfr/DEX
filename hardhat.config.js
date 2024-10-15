require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */

WALLET_ARTHURO = process.env.WALLET_ARTHURO;
WALLET_JORGE = process.env.WALLET_JORGE;
WALLET_MARIA = process.env.WALLET_MARIA;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      },
      {
        version: "0.8.27"
      }
    ]
  },
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [WALLET_ARTHURO, WALLET_JORGE, WALLET_MARIA]
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  },
  namedAccounts: {
    deployerTokenA: {
      default: 0
    },
    deployerTokenB: {
      default: 1
    },
    dexDeployer: {
      default: 2
    }
  },
  etherscan: {
    enabled: true,
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  sourcify: {
    enabled: true
  }
};
