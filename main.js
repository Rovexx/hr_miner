// Get last block via API
const axios = require('axios');

// Methods
const mine = require('./methods/mine.js').mine;

const name = 'Roel Versteeg 0940512';
const urlBlocks = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain';
const urlNextBlock = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next';

const chain = 
{
  blockchain: {
      _id: "5c5003d55c63d51f191cadd6",
      algorithm: "mod10sha,0000",
      hash: "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8",
      nonce: "10312",
      timestamp: 1548747788716,
      __v: 0,
      data: [
          {
              _id: "5c4f20695c63d51f191cadd1",
              from: "CMGT Mining Corporation",
              to: "Bob PIKAB",
              amount: 1,
              timestamp: 1548689513858
          }
      ]
  },
  transactions: [
      {
          _id: "5c5003d55c63d51f191cadd7",
          from: "CMGT Mining Corporation",
          to: "Bas BOOTB",
          amount: 1,
          timestamp: 1548747733261,
          __v: 0
      }
  ],
  timestamp: 1548748101396,
  algorithm: "mod10sha,0000",
  open: true,
  countdown: 57235
}

console.clear();

getNextBlock();

function getNextBlock() {
  // hashNext(chain);
  axios.get(urlNextBlock)
    .then(response => {
      // If next block can be hashed
      if (response.data.open) {
        hashNext(response.data);
      } else {
        console.log('Next block can be hashed in: ', response.data.countdown / 1000, 's');
        // Try again in 1 second
        setTimeout(getNextBlock, 1000);
        return;
      }
    })
    .catch(error => {
      console.log(error);
    });
}


/**
 * This hashes the next block
 * @param responseData JSON data from the next block in the blockchain
 */
function hashNext(responseData) {
  // Start timer for hashing
  console.time('\nHASHING TIME\n');

  if (responseData.blockchain === undefined) {
    console.log('No data, Do you have the interwebs?')
  } else {
    // Create string for the block to be hashed without spaces from data
    const lastBlockData = (
      responseData.blockchain.hash +
      responseData.blockchain.data[0].from +
      responseData.blockchain.data[0].to +
      responseData.blockchain.data[0].amount +
      responseData.blockchain.data[0].timestamp +
      responseData.blockchain.timestamp +
      responseData.blockchain.nonce
    )

    const nextBlockData =
      responseData.transactions[0].from +
      responseData.transactions[0].to +
      responseData.transactions[0].amount +
      responseData.transactions[0].timestamp +
      responseData.timestamp
    
    mine(lastBlockData, nextBlockData, 0, name, urlBlocks);
    console.log('Going again...');
    getNextBlock();
  }
  // Stop timer for hashing
  console.timeEnd('\nHASHING TIME\n');
}