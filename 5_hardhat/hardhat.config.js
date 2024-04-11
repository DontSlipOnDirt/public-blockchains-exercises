require("@nomicfoundation/hardhat-toolbox");
// pathToDotEnv = path.join(process.cwd(), '.env');
// require('dotenv').config(pathToDotEnv);
// path to .env file
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_API_URL,
      accounts: [process.env.METAMASK_1_PRIVATE_KEY,]
    }
  }
};
