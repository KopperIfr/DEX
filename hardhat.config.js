require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@nomiclabs/hardhat-ethers');
/** @type import('hardhat/config').HardhatUserConfig */
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
  namedAccounts: {
    deployer: {
      default: 0
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
