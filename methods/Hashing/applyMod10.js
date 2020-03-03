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
    function countTogether(firstChunk, secondChunk, generatedChunk) {
      if(generatedChunk.length !== 10) {
        const i = generatedChunk.length;
        const added = (firstChunk[i] + secondChunk[i]);
        generatedChunk.push(added % 10);

        // As long as the new chunk is not done call this function again
        return countTogether(firstChunk, secondChunk, generatedChunk);
      } else {
        return generatedChunk;
      }
    }

    const newChunk = countTogether(chunk_1, chunk_2, []);
    // Ad the new chunk to the beginning for the next round
    blockInChunks.unshift(newChunk);
    // repeat
    return applyMod10(blockInChunks);
    // return
  } else {
    // Convert to string and return
    return blockInChunks.flat().join('');
  }
}

module.exports = {
  applyMod10: applyMod10
}