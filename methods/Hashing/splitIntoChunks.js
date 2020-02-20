/**
 * This splits the given array of numbers into chunks of 10 long.
 * If a single chunk is not 10 long it will be filled with the numbers 0 - 9 until it is.
 * Returns the block in chuncks of 10 long
 * @param block An array with numbers that came from the, to ASCII converted, block data
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

module.exports = {
  splitIntoChunks: splitIntoChunks
}