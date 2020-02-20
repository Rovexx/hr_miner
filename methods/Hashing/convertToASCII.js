
/**
 * This will convert the letters froma string to ASCII and leave the existing numbers intact.
 * This will return the converted string as an array of numbers.
 * @param stringToConvert String of data from the block to convert to ASCII
 */
function convertToASCII(stringToConvert) {
  let convertedCharactersArray = [];
  // Split string into characters
  const stringAsArray = stringToConvert.replace(/\s/g, '').split('');
 
  // Convert character if its NaN
  stringAsArray.forEach(character => {
    if (isNaN(character)) {
      // convert to ascii
      let ASCII = character.charCodeAt(0).toString();
      // add to converted string but split into only single digets per entry in the array
      for (let diget = 0; diget < ASCII.length; diget++) {
        convertedCharactersArray.push(parseInt(ASCII.charAt(diget)));
      }
    }
    else {
      // add to converted string
      convertedCharactersArray.push(parseInt(character));
    }
  });
  return convertedCharactersArray;
}

module.exports = {
  convertToASCII: convertToASCII
}