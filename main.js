// Get last block via API
const axios = require('axios');
const sha256 = require('sha256')

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
    const lastBlock = (
      responseData.blockchain.hash +
      responseData.blockchain.data[0].from +
      responseData.blockchain.data[0].to +
      responseData.blockchain.data[0].amount +
      responseData.blockchain.data[0].timestamp +
      responseData.blockchain.timestamp +
      responseData.blockchain.nonce
    ).replace(/ /g, '');

    const nextBlock =
      responseData.transactions[0].from +
      responseData.transactions[0].to +
      responseData.transactions[0].amount +
      responseData.transactions[0].timestamp +
      responseData.timestamp

    prepareBlockForHash(lastBlock, nextBlock);
  }

  // Stop timer for hashing
  console.timeEnd('\nHASHING TIME\n');
}

function prepareBlockForHash(lastBlock, nextBlock) {
  // Convert block string to ASCII but leave numbers intact
  const blockAsASCII = convertToASCII(lastBlock);

  // Split numbers into chunks of 10
  const splitBlock = splitIntoChunks(blockAsASCII);

  // Count up chunks
  const countedBlock = countBlocks(splitBlock);

  // SHA256 
  const hash = (countedBlock + nextBlock);

  console.log(hash);
}

/**
 * This will convert the letters froma string to ASCII and leave the existing numbers intact.
 * This will return the converted string as an array of numbers.
 * @param stringToConvert String of data from the block to convert to ASCII
 */
function convertToASCII(stringToConvert) {
  console.log('Converting to ASCII...');
  let convertedCharactersArray = [];
  // Split string into characters
  const stringAsArray = stringToConvert.split('');

  // Convert character if its NaN
  stringAsArray.forEach(character => {
    if (isNaN(character)) {
      // convert to ascii
      let ASCII = character.charCodeAt(0);
      // add to converted string
      convertedCharactersArray.push(ASCII)
    }
    else {
      // add to converted string
      convertedCharactersArray.push(parseInt(character));
    }
  });
  return convertedCharactersArray;
}

/**
 * This splits the given array of numbers into chunks of 10 long.
 * If a single chunk is not 10 long it will be filled with the numbers 0 - 9 until it is.
 * Returns the block in chuncks of 10 long
 * @param blocks An array with numbers that came from the, to ASCII converted, block data 
 */
function splitIntoChunks(block) {
  console.log('Splitting into chunks...');
  let chunkifiedBlock = [];
  // Split into chunks of 10
  const chunkLength = 10;
  for (let i = 0; i < block.length; i += chunkLength) {
    let chunk = block.slice(i, i + chunkLength);
    // check that chunk is 10 long
    if (chunk.length < chunkLength) {
      // fill to correct length
      console.log('Last block need another', chunk.length, 'numbers');
      const ammountToFill = chunkLength - chunk.length;
      const fillerNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < ammountToFill; i++) {
        chunk.push(fillerNumbers[i]);
      }
    }
    chunkifiedBlock.push(chunk);
  }
  return chunkifiedBlock;
}

/**
 * This take the chunks of numbers from the next block, counts up the numbers from all chunks and % 10 the results.
 * Then it and returns a SHA256 string of the counted numbers.
 * @param blockInChunks All chunks with 10 numbers from the last block
 */
function countBlocks(blockInChunks) {
  // Iterate over all chunks two at a time
  if (blockInChunks.length !== 1) {
    const chunk_1 = blockInChunks[0];
    const chunk_2 = blockInChunks[1];

    blockInChunks.splice(0, 2);

    // add the numbers together from both arrays
    let newChunk = [];
    for (let i = 0; i < 10; i++) {
      let added = (chunk_1[i] + chunk_2[i]);
      newChunk.push(added % 10);
    }
    // Ad the new chunk to the beginning for the next round
    blockInChunks.unshift(newChunk);
    // repeat
    return countBlocks(blockInChunks);
    // return
  } else {
    // Convert to string, convert to SHA256 and return
    return sha256(blockInChunks.join(''));
  }
}

function findNonce(lastBlockString, nextBlockString) {
  
}