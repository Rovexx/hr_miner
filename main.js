// Get last block via API
const axios = require('axios');

// Methods
const mine = require('./methods/mine.js').mine;

const name = 'Roel Versteeg 0940512';
const UrlBlocks = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain';
const UrlNextBlock = 'https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next';

const chain = {
  blockchain: {
    _id: "5e4cff684fb2a5116aa6179d",
    algorithm: "mod10sha,0000",
    hash: "0000d4ad0f951acfea728b800591946c40267c66038d56d791dfeeba44bc840b",
    nonce: "259837",
    timestamp: 1582104383875,
    __v: 0,
    data: [
      {
        _id: "5e4cff0d4fb2a5116aa61764",
        from: "CMGT Mining Corporation",
        to: "Justin 0941123",
        amount: 1,
        timestamp: 1582104333517
      }
    ]
  },
  transactions: [
    {
      _id: "5e4cff914fb2a5116aa617bb",
      from: "CMGT Mining Corporation",
      to: "Frank Solleveld",
      amount: 1,
      timestamp: 1582104465177,
      __v: 0
    }
  ],
  timestamp: 1582104586624,
  algorithm: "mod10sha,0000",
  open: true,
  countdown: 79224
}
console.clear();

getNextBlock();

function getNextBlock() {
  // temp hardcode
  hashNext(chain);
  // axios.get(UrlNextBlock)
  //   .then(response => {
  //     // If next block can be hashed
  //     if (response.data.open) {
  //       hashNext(response.data);
  //     } else {
  //       console.log('Next block can be hashed in: ', response.data.countdown / 1000, 's');
  //       // Try again in 1 second
  //       setTimeout(getNextBlock, 1000);
  //       return;
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
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
    console.log('Stringifying the block...');
    // Create string for the block to be hashed without spaces from data
    const lastBlockData = (
      responseData.blockchain.hash +
      responseData.blockchain.data[0].from +
      responseData.blockchain.data[0].to +
      responseData.blockchain.data[0].amount +
      responseData.blockchain.data[0].timestamp +
      responseData.blockchain.timestamp +
      responseData.blockchain.nonce
    ).replace(/ /g, '');

    const nextBlockData =
      responseData.transactions[0].from +
      responseData.transactions[0].to +
      responseData.transactions[0].amount +
      responseData.transactions[0].timestamp +
      responseData.timestamp

    mine(lastBlockData, nextBlockData, 0);
  }
  // Stop timer for hashing
  console.timeEnd('\nHASHING TIME\n');
}