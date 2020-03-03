const sha256 = require('sha256');
const axios = require('axios');

// Methods
const convertToASCII = require('./hashing/convertToASCII.js').convertToASCII;
const splitIntoChunks = require('./hashing/splitIntoChunks.js').splitIntoChunks;
const applyMod10 = require('./hashing/applyMod10.js').applyMod10;

/**
 * This will mine the next block of the CMGT COIN
 * @param lastBlockData Data from next block to be hashed
 * @param nonce Starting nonce
 */
function mine(lastBlockData, nextBlockData, nonce, name, postUrl) {
  const preparedHashString = hash(lastBlockData) + nextBlockData;

  // Find the correct nonce
  console.log('Mining...');
  while (hash(preparedHashString + nonce).slice(0, 4) !== '0000') {
    nonce++
  }
  console.log('Nonce found!', nonce);
  console.log('Matched Hash: ', hash(preparedHashString + nonce));
  
  axios.post(postUrl, {
    "nonce": nonce.toString(),
    "user": name
  }, {
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => {
      console.log(response.data);
  }).catch(error => {
      console.log(error);
  })
}

/**
 * Generate a string from the data from the last block and return a hash based on the MOD10 algorithm
 * @param lastBlock A string from the data of the last block in the chain
 */
function hash(lastBlock) {
  // Convert block string to ASCII but leave numbers intact
  const blockAsASCII = convertToASCII(lastBlock);

  // Split numbers into chunks of 10
  const splitBlock = splitIntoChunks(blockAsASCII);

  // Count up chunks with Mod10 algorithm
  const finalString = applyMod10(splitBlock);

  // As higher order functions
  // const finalString = applyMod10(splitIntoChunks(convertToASCII(lastBlock)));

  const hashedFinalString = sha256(finalString);
  return hashedFinalString;
}

module.exports = {
  mine: mine,
  hash: hash
}