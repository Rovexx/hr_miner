const sha256 = require('sha256');

/**
 * This will mine the next block of the CMGT COIN
 * @param lastBlockData Data from next block to be hashed
 * @param nonce Starting nonce
 */
function mine(lastBlockData, nextBlockData, nonce) {
  const preparedHashString = prepareHashString(lastBlockData, nextBlockData);

  // Find the correct nonce
  console.log('Mining...');
  while (sha256(hash(preparedHashString + nonce)).slice(0, 4) !== '0000') {
    nonce++
  }

  console.log('Nonce found!', nonce);
  console.log('Matched Hash: ', sha256(hash(preparedHashString + nonce)));
  
  // axios.post(url, {
  //   "nonce": nonce.toString(),
  //   "user": name
  // }, {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // }).then(response => {
  //     console.log(response.data);
  // }).catch(error => {
  //     console.log(error);
  // })
}

function prepareHashString(lastBlockData, nextBlockData) {
  const lastBlockString = hash(lastBlockData);
  const preparedHashString = sha256(lastBlockString) + nextBlockData;

  return preparedHashString;
}

// Hash a string
function hash(lastBlock) {
  // Convert block string to ASCII but leave numbers intact
  const blockAsASCII = convertToASCII(lastBlock);

  // Split numbers into chunks of 10
  const splitBlock = splitIntoChunks(blockAsASCII);

  // Count up chunks with Mod10 algorithm
  const finalString = applyMod10(splitBlock);

  return finalString;
}

/**
 * This will convert the letters froma string to ASCII and leave the existing numbers intact.
 * This will return the converted string as an array of numbers.
 * @param stringToConvert String of data from the block to convert to ASCII
 */
function convertToASCII(stringToConvert) {
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
  let chunkifiedBlock = [];
  // Split into chunks of 10
  const chunkLength = 10;
  for (let i = 0; i < block.length; i += chunkLength) {
    let chunk = block.slice(i, i + chunkLength);
    // check that chunk is 10 long
    if (chunk.length < chunkLength) {
      // fill to correct length
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
function applyMod10(blockInChunks) {
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
    return applyMod10(blockInChunks);
    // return
  } else {
    // Convert to string and return
    return blockInChunks.join('');
  }
}

module.exports = {
  mine: mine,
  hash: hash
}