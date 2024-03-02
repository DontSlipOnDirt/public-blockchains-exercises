// EthersJS: Wallets.
/////////////////////

// Ethers JS:
// https://docs.ethers.org/v6/

function exit() {
    console.log('Exercise ' + exercise + ' completed.');
    process.exit(0);
    console.log('I will not be printed to console :(');
}

// Exercise 1. Create a Random Wallet.
//////////////////////////////////////
exercise = '1a';

const ethers = require("ethers");

// a. Create a random wallet and print the address, the private key,
// and the mnenomic phrase.
// Hint: ethers.Wallet.createRandom();

wallet = ethers.Wallet.createRandom()

console.log("Address:", wallet.address);
console.log("Private key:", wallet.privateKey);
console.log("Mnemonic phrase:", wallet.mnemonic.phrase);


// exit();

// b. Bonus. Print the derivation path of the wallet and check that it is
// equal to `baseDevPath`. 

exercise = '1b';

let baseDevPath = "m/44'/60'/0'/0/0";

// Wait is the derivation path? 
// Basically, the mnemonic alone isn't enough to determine an address
// and you need this extra bit of information. You may learn more here:
// https://www.youtube.com/watch?v=tPCN3nDVzZI
// Also:
// https://vault12.com/securemycrypto/crypto-security-basics/what-is-bip39/



console.log("Derivation path:", wallet.path);
console.log("Base Derivation path:", baseDevPath);

// Your code here!

if (wallet.path === baseDevPath) {
    console.log("The derivation path is correct.");
} else {
    console.log("The derivation path is incorrect.");
}

// exit();

// Exercise 2. Bonus. Create a Hierarchical Deterministic Wallet.
/////////////////////////////////////////////////////////////////
console.log();
exercise = 2;

// From the same wallet, you can derive a deterministic sequence of addresses.
// First, pick a mnemonic, then create a hierarchical deterministic wallet, 
// finally print the first 10 addresses and private keys generated.
// Hint: You need to append an index to the derivation path.

// Your code here!

// make random mnemonic phrase
const mnemonic = 'test test test test test test test test test test test junk';
// create wallet from mnemonic phrase
// const hdwallet = ethers.Wallet.fromPhrase(mnemonic);
// console.log(hdwallet.path);

// Create an instance of ethers.utils.HDNode
const hdNode = ethers.utils.HdNode.fromPhrase(mnemonic);

for (let i = 1; i < 10; i++) {
    const derivedWallet = hdNode.derivePath(baseDevPath + "/" + i);
    console.log("Address:", derivedWallet.address);
    console.log("Private key:", derivedWallet.privateKey);
}


exit();