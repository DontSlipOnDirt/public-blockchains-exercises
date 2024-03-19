// Hardhat: First interaction with Hardhat blockchain.
//////////////////////////////////////////////////////

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



// Exercise 3. Signer on the Hardhat blockchain.
////////////////////////////////////////////////

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


// Exercise 4. Send a transaction.
//////////////////////////////////

// Send some Ether from the address of the signer in Exercise 3 to one of your
// accounts on Metamask (e.g., the one used to make the submissions in 
// this course).

const account2 = process.env.METAMASK_1_ADDRESS;

const sendTransaction = async () => {
    
    let b1 = await hardHatProvider.getBalance(signer.address);
    let b2 = await hardHatProvider.getBalance(account2);
    b1 = ethers.formatEther(b1);
    b2 = ethers.formatEther(b2);

    tx = await signer.sendTransaction({
        to: account2,
        value: ethers.parseEther("0.01")
    });
    
    console.log('Transaction is in the mempool...');
    await tx.wait();

    console.log('Transaction mined!');

    let updatedB1 = await hardHatProvider.getBalance(signer.address);
    let updatedB2 = await hardHatProvider.getBalance(account2);
    updatedB1 = ethers.formatEther(updatedB1);
    updatedB2 = ethers.formatEther(updatedB2);

    console.log('Balance for', signer.address, 'changed from', b1, 'to', updatedB1);
    console.log('Balance for', account2, 'changed from', b2, 'to', updatedB2);
};

sendTransaction();

