const convertToASCII = require('../methods/hashing/convertToASCII').convertToASCII;
const splitintoChunks = require('../methods/hashing/splitIntoChunks').splitIntoChunks;
const applyMod10 = require('../methods/hashing/applyMod10').applyMod10;
const hash = require('../methods/mine').hash;

describe("Mining", () => {
  describe("Hashing", () => {
    describe("hash", () => {
      const stringFromLastBlock  = "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312";
      const hashedString = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf";
      it("Uses the MOD 10 algorithm to generate the correct hash", () => {
        expect(hash(stringFromLastBlock)).toEqual(hashedString);
      });
    });
  });
  describe("MOD10 algorithm", () => {
    // Test the ASCII conversion
    describe("convertToASCII", () => {
      describe("When the function recieved block data", () => {
        const stringFromLastBlock  = "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312";
        const expectedReturnHash = [0, 0, 0, 0, 7, 8, 4, 5, 4, 9, 9, 0, 3, 8, 8, 7, 1, 1, 0, 2, 9, 7, 4, 1, 0, 0, 6, 7, 9, 8, 0, 0, 2, 2, 9, 7, 3, 0, 9, 8, 9, 7, 9, 7, 1, 0, 2, 2, 5, 1, 0, 1, 9, 7, 9, 7, 2, 3, 1, 1, 0, 2, 8, 9, 9, 1, 9, 8, 1, 0, 8, 1, 0, 1, 2, 6, 2, 4, 1, 0, 2, 0, 5, 2, 1, 0, 2, 3, 1, 0, 2, 8, 6, 7, 7, 7, 7, 1, 8, 4, 7, 7, 1, 0, 5, 1, 1, 0, 1, 0, 5, 1, 1, 0, 1, 0, 3, 6, 7, 1, 1, 1, 1, 1, 4, 1, 1, 2, 1, 1, 1, 1, 1, 4, 9, 7, 1, 1, 6, 1, 0, 5, 1, 1, 1, 1, 1, 0, 6, 6, 1, 1, 1, 9, 8, 8, 0, 7, 3, 7, 5, 6, 5, 6, 6, 1, 1, 5, 4, 8, 6, 8, 9, 5, 1, 3, 8, 5, 8, 1, 5, 4, 8, 7, 4, 7, 7, 8, 8, 7, 1, 6, 1, 0, 3, 1, 2];
        it("Converts it into ASCII and returns all numbers in an array", () => {
          expect(convertToASCII(stringFromLastBlock)).toEqual(expectedReturnHash);
        });
      });
      describe("When the function recieved a string with spaces", () => {
        const stringToTest  = "a a";
        const expectedReturnHash = [9, 7, 9, 7];
        it("Removes spaces", () => {
          expect(convertToASCII(stringToTest)).toEqual(expectedReturnHash);
        });
      });
      describe("When the function recieved a number", () => {
        const stringToTest  = "12a3";
        const expectedReturnHash = [1, 2, 9, 7, 3];
        it("Leaves the number intact", () => {
          expect(convertToASCII(stringToTest)).toEqual(expectedReturnHash);
        });
      });
    });
    // Test the splitting into chunks
    describe("splitIntoChunks", () => {
      describe("When the data is prepared for the counting it is devided into chunks of 10", () => {
        const blockOf12  = [1, 1, 6, 1, 0, 1, 1, 2, 0, 1, 1, 6];
        const expectedReturn12 = [
          [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
          [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]
        ];
        it("Returns 2 chunks of 10 with an input of 12", () => {
          expect(splitintoChunks(blockOf12)).toEqual(expectedReturn12);
        });
      });
    });
    // Test counting the chunks
    describe("applyMod10", () => {
      describe("When the MOD10 counts the chunks of 10 together", () => {
        const blockInChunksShort = [
          [1, 1, 6, 1, 0, 1, 1, 2, 0, 1],
          [1, 6, 0, 1, 2, 3, 4, 5, 6, 7]
        ];
        const blockInChunksLong = [
          [0, 0, 0, 0, 0, 9, 1, 9, 0, 1],
          [0, 0, 9, 8, 1, 0, 0, 9, 9, 1],
          [4, 9, 8, 8, 6, 3, 6, 9, 1, 0]
        ];
        const expectedReturnShort = "2762245768";
        const expectedReturnLong = "4976727702";
        it("Returns correct with exacly 20 input", () => {
          expect(applyMod10(blockInChunksShort)).toEqual(expectedReturnShort);
        });
        it("Returns correct with more then 20 input", () => {
          expect(applyMod10(blockInChunksLong)).toEqual(expectedReturnLong);
        });
      });
    });
  });
});
