require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */

WALLET_1 = process.env.PRIVATE_API_KEY;
WALLET_2 = process.env.WALLET_2;
WALLET_3 = process.env.WALLET_3;

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
      accounts: [WALLET_1, WALLET_2, WALLET_3]
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  },
  namedAccounts: {
    tokenAadmin: {
      default: 0
    },
    tokenBadmin: {
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
