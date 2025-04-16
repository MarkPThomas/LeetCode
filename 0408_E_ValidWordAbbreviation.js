// 2025/04/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 31:11 min
// Patterns: Two Pointer
// Notes w.r.t. solution:
/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
var validWordAbbreviation = function (word, abbr) {
  let ptrWord = 0;
  let ptrAbbr = 0;
  while (ptrWord < word.length && ptrAbbr < abbr.length) {
    // mismatched chars
    while (ptrAbbr < abbr.length && isNaN(Number(abbr[ptrAbbr]))) {
      if (word[ptrWord] !== abbr[ptrAbbr]) {
        return false;
      }
      ptrWord++;
      ptrAbbr++;
    }

    // invalid #s
    let numChars = '';
    while (ptrAbbr < abbr.length && !isNaN(Number(abbr[ptrAbbr]))) {
      const nextInt = abbr[ptrAbbr];

      // 0 can only follow another integer
      if (numChars.length === 0 && nextInt === '0') {
        return false;
      }
      numChars += nextInt;

      ptrAbbr++;
    }

    // Integers assumed separated by chars - check end overrun
    let numInts = Number(numChars);
    if (numInts > word.length - ptrWord) {
      return false;
    }

    while (numInts) {
      ptrWord++;
      numInts--;
    }

    // mismatched end position
    if (ptrWord >= word.length) {
      return ptrAbbr >= abbr.length;
    }
  }

  return ptrWord === word.length && ptrAbbr === abbr.length;
};