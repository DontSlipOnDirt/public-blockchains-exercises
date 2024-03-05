
// Loading path module for operations with file paths.
const path = require('path');

// Ethers JS: Providers.
////////////////////////

// A Provider is a read-only connection to the blockchain, which allows
// querying the blockchain state, such as accout, block or transaction
// details, querying event logs or evaluating read-only code using call.

// See: https://docs.ethers.org/v6/getting-started/

// Exercise 0. Require the `dotenv` and `ethers` package.
/////////////////////////////////////////////////////////

// Hint: As you did in file 1_wallet.

pathToDotEnv = path.join(process.cwd(), '.env');
require('dotenv').config(pathToDotEnv);
const ethers = require('ethers');

// Exercise 1. Connect to Mainnet (a.k.a welcome async!).
/////////////////////////////////////////////////////////

// Whenever you interact with a blockchain you are in the "async" domain. 

// In JavaScript, you generally use "promises" to handle asynchronous   
// code execution. There are two ways of working with promises:
//
// 1. .then() notation (standard Promises)
// 2. async/await pattern (newer notation)
//
// Important! You can use promises anywhere in your code, but you can use 
// "await" only inside an "async" function. This makes things a bit more
// complicated, but not too much.
// 
// If this is new to you, you can read more about these here:
// https://javascript.info/async

// You can also check the 2_JS_Async folder for exercises on asynchronous 
// code in JavaScript.

// a. Create a JSON RPC provider and connect to the Ethereum Mainnet.  

// Hint: check EthersJS docs for the method `JsonRpcProvider` and what 
// parameters it needs (nested hint: you need something from the .env file).

const mainNetProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_API_URL);

// b. Verify that the network's name is "mainnet" and the chain id is 1.

// Hint: `getNetwork()`.

// Hint2: the value of chain id returned by Ethers JS is of type "BigInt". 
// As the name suggests, that is a very a data type capable of holding very
// large (integer) numbers. Remember to cast it to Number for a nicer display.
// https://javascript.info/bigint 

// b1. Use the async/await pattern to do the job.


// This is an asynchronous anonymous self-executing function. It is a ugly
// construct, but it allows you to use await inside its body.
(async () => {
    
    // Your code maybe here!

})();

// However, the async function could also be named, and the result is:
const network = async () => {
    
    const network = await mainNetProvider.getNetwork();
    const chainId = Number(network.chainId);
    console.log('Network:', network.name);
    console.log('Chain ID:', chainId);
};

// which you can then call:

// network();

// The second (less compact) notation has the advantage that we can invoke
// the code only when needed, so it is preferred in this exercise sheet.

// b2. Bonus. Re-write the code above using the promise standard notation.

// Promises.

// Checkpoint. We use `return` to terminate the execution insted
// of process.exit(). Why?
// return;



// Exercise 2. Block Number.
////////////////////////////

// a. Get the latest block number from the Ethereum mainnet. Then compare it
// with the value displayed on Etherscan.io.

// // Look up the current block number
const blockNum = async () => {
    
    const currBlockNum = await mainNetProvider.getBlockNumber();
    return currBlockNum;
};

// blockNum().then(data => console.log('Current block num: ' + data));

// b. The Ethereum mainnet is one of the most secure blockchains in the world.
// The testnets of Ethereum are a bit less secure because they might have 
// experimental features, but also because they are replaced often and so
// they have a shorter chain. How shorter?

// Connect to the Goerli test net, get the latest block number and print
// the difference in chain length with mainnet.

const testNetProvider = new ethers.JsonRpcProvider(process.env.ALCHEMY_GOERLI_API_URL);

// Look up the current block number in Mainnet and Goerli.
const blockDiff = async () => {
    const currBlockNum = await mainNetProvider.getBlockNumber();
    console.log('Current block number:', currBlockNum);
    const currBlockNum2 = await testNetProvider.getBlockNumber();
    console.log('Current block number:', currBlockNum2);
    return;
};

// blockDiff();

// Exercise 3. Block time.
//////////////////////////

// How long does it take to get a new block?

// a. Here is an elaborate solution to measure the time passed between
// two blocks. Review the function below, in particular:

// - the ternary operator,
// - the built-in Date object,
// - the setInterval and clearInterval functions

// Run the function once for Mainnet and once for Goerli. Do you get similar
// results?

// Asynchronous functions with pre-defined input parameters.
const checkBlockTime = async (providerName = "mainnet", blocks2check = 3) => {

    // JS Ternary Operator.
    let provider = providerName.toLowerCase() === "mainnet" ? 
        mainNetProvider : testNetProvider;

    // Get initial block number and timestamp.
    let d = Date.now();
    let blockNumber = await provider.getBlockNumber();
    console.log(providerName, 'Current Block num:', blockNumber);

    // Keep track of how many blocks to check.
    let blocksChecked = 0;

    // Poll the blockchain every second to check for a new block number.
    let myInterval = setInterval(async () => {

        let newBlockNumber = await provider.getBlockNumber();
        
        // Compare block numbers.
        if (newBlockNumber !== blockNumber) {
            // Check time.
            let d2 = Date.now();
            let timeDiff = d2 - d;
            console.log(providerName, "New Block num:", newBlockNumber);
            console.log(providerName, "It took: ", timeDiff);
            
            // Update loop variables.
            d = d2;
            if (++blocksChecked >= blocks2check) {
                clearInterval(myInterval);
            }
            blockNumber = newBlockNumber;
        }

    }, 1000);
    
};

// checkBlockTime("Mainnet");

// checkBlockTime("Goerli");

// b. Bonus. The checkBlockTime function can be rewritten more efficiently 
// using the Observer pattern offer by EtherS JS and listening to the 
// "block" event. See:
// https://docs.ethers.org/v5/api/providers/provider/#Provider--event-methods

// Do it! 
// Hint: setInterval/clearInterval are replaced by on/off calls.

const checkBlockTime2 = async (providerName = "mainnet", blocks2check = 3) => {

    // Your code here!

};

// checkBlockTime2("mainnet");

// return;

// c. Now that you know the answer, you can check the 
// "Ethereum Average Block Time Chart": https://etherscan.io/chart/blocktime


// Exercise 4. Block info.
//////////////////////////

// a. Look up the last block in Mainnet and print it to console.
// Hint: first get the last block number, and then use .getBlock(blockNumber).

const lastBlock = async () => {
    const currBlock = blockNum().then(data => mainNetProvider.getBlock(data));
    return currBlock;
};

// b. How many transactions does the block contains?

// lastBlock().then(data => console.log(data.transactions.length));

// c. Pick a transaction and examine its receipt.
// Hint: use getTransactionReceipt().

// lastBlock()
//     .then(data => {
//         transact = data.getTransaction(10);
//         console.log(mainNetProvider.getTransactionReceipt(transact));
// });

// d. Transactions can be prefetched, so that you save one blockchain call.
// Hint: pass `true` as second parameter to .getBlock(blockNumber, true).

const blockInfo = async () => {
    const currBlock = blockNum().then(data => mainNetProvider.getBlock(data, true));
    return currBlock;
};

// blockInfo();

// Exercise 5. ENS names.
//////////////////////////

// Resolve the name 'unima.eth' on the Goerli network, then lookup the
// address.

const ens = async () => {
    
    let unimaAddress = await testNetProvider.resolveName('unima.eth');
    console.log('unima.eth:', unimaAddress);
    return unimaAddress;
};

// ens();


// Exercise 6. Get ETH balance.
///////////////////////////////

// a. Ask for the Ether balance of "unima.eth". 
// Hint: remember to be on the Goerli net.

// b. Format the balance nicely with the formatEther utility.

// c. Compare the ETH balance for the ENS name "unima.eth" and the balance
// its address (after resolving it). Are they the same?

// d. Bonus. What is the balance for the address of Vitalik Buterin, the 
// creator of Ethereum? 
// Hint: try vitalik.eth

const balance = async (ensName = "unima.eth") => {

    let ethBalance = await mainNetProvider.getBalance(ensName);
    console.log('ETH balance:', ethers.formatEther(ethBalance));
    return ethBalance;

};

// balance("unima.eth");

// balance("vitalik.eth");


// Exercise 7. Get ERC20 Balance.
/////////////////////////////////

// To get the balance of ERC20 tokens the procedure is a bit more complex.
// ETH is the native currency of Ethereum, so it's "simply there". Instead,
// ERC20 tokens are added to Ethereum via smart contracts. So, we need to 
// interact with the smart contract of the specific token we want to know
// the balance of.

// First, we need to know the address of the smart contract. We can use the 
// LINK contract.
const linkAddress = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb';

// At the address, there is only bytecode. So we need to tell Ethers JS, what
// methods can be invoked. To do so, we pass the Application Binary Interface
// (ABI) of the contract, available at Etherscan. For your convenience, 
// the LINK ABI is stored in this directory, under "link_abi.json";

const linkABI = require('./link_abi.json');

// Now your task. Get the balance for LINK for "unima.eth" and "vitalik.eth".
// Hint: you need first to create a Contract object via `ethers.Contract`, 
// then invoke the appropriate smart contract method.
// Hint2: want to try it with your own address? Get some LINK ERC20 tokens here: 
// https://faucets.chain.link/goerli

const link = async () => {
    let newContract = new ethers.Contract(linkAddress, linkABI, mainNetProvider);
    let balance = await newContract.balanceOf('unima.eth');
    console.log('LINK balance unima:', ethers.utils.formatEther(balance));
    
    // let balance2 = await newContract.balanceOf('vitalik.eth');
    // console.log('LINK balance vitalik:', ethers.utils.formatEther(balance2));
};


link();


