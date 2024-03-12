// Ethers JS: First interaction with Hardhat blockchain.
////////////////////////////////////////////////////////////

// Exercise 0. Load dependencies and network provider.
//////////////////////////////////////////////////////

// a. Require the `dotenv` and `ethers` packages.
// Hint: As you did multiple times now.

const path = require('path');
pathToDotEnv = path.join(process.cwd(), '.env');
require('dotenv').config(pathToDotEnv);
const ethers = require('ethers');
const { sign } = require('crypto');


// Exercise 1. Create a JSON RPC Provider for the Hardhat blockchain.
/////////////////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

const hardHatProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

// Exercise 2. Let's query the provider.
////////////////////////////////////////

// Hardhat Blockchain si too long. Let's call it NUMA.
// Print to console the network name, chain id, and block number of NUMA.

const networkInfo = async () => {
   
    const NUMA = await hardHatProvider.getNetwork();
    const chainId = Number(NUMA.chainId);
    console.log('Network:', NUMA.name);
    console.log('Chain ID:', chainId);
};

// networkInfo();


// Exercise 3. Connect a signer to the Hardhat blockchain.
//////////////////////////////////////////////////////////

// Hint: you will find the info printed to console after you start the hardhat
// blockchain.

let hhPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

signer = new ethers.Wallet(hhPrivateKey, hardHatProvider);

// b. Print the next nonce necessary to send a transaction.
// Hint: .getNonce()

const getNonce = async() => {

    const nonce = await signer.getNonce()
    console.log('Nonce:', nonce);
};

// getNonce();


// Exercise 4. Check gas.
/////////////////////////

// a. Let's get some gas from the faucet. What is the faucet's address? 
// Check the slides in ILIAS.
// Hint: only accessible within UniMa network.

// b. Check your balance on UniMa network.

const checkBalance = async () => {

    // Your code here!
};

// checkBalance();

// Exercise 5. Send a transaction.
//////////////////////////////////

// Send some Ether from one of your accounts to another one on NUMA.

const account2 = process.env.METAMASK_2_ADDRESS;

const sendTransaction = async () => {

    // Your code here!
};

// sendTransaction();

