require("@nomicfoundation/hardhat-toolbox");
const dotenv = require('dotenv').config('C:/Users/jcmuf/Desktop/Public Blockchain/public-blockchains-exercises/.env');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: dotenv.ALCHEMY_SEPOLIA_API_URL,
      accounts: [dotenv.METAMASK_1_PRIVATE_KEY,]
    }
  }
};
