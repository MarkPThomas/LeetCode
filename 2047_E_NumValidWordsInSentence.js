// 2025/05/14
// O(n) time complexity
// O(1) space complexity
//  where b = # chars in sentence
// Time to complete: 15:51 min
// Patterns: String
// Notes w.r.t. solution:
/**
 * @param {string} sentence
 * @return {number}
 */
var countValidWords = function (sentence) {

  const punctuation = new Set();
  punctuation.add('!');
  punctuation.add('.');
  punctuation.add(',');

  function isValid(word) {
    if (!word.trim()) {
      return false;
    }

    let hyphenFound = false;
    for (let i = 0; i < word.length; i++) {
      // 1. No digits
      if (isInteger(word[i])) {
        return false;
      }

      // 2. At most one '-' bounded by lowercase letters
      if (word[i] === '-') {
        if (!hyphenFound && (isLetter(word[i - 1]) && isLetter(word[i + 1]))) {
          hyphenFound = true;
        } else {
          return false;
        }
      }

      // 3. At most one '!', '.', or ',', only at the end
      if (punctuation.has(word[i]) && i !== word.length - 1) {
        return false;
      }
    }

    return true;
  }

  function isInteger(char) {
    const charCode = char.charCodeAt();
    return '0'.charCodeAt() <= charCode && charCode <= '9'.charCodeAt()
  }

  function isLetter(char) {
    if (char === undefined) {
      return false;
    }

    const charCode = char.charCodeAt();
    return 'a'.charCodeAt() <= charCode && charCode <= 'z'.charCodeAt();
  }

  let numValid = 0;
  const words = sentence.split(' ');
  for (const word of words) {
    if (isValid(word)) {
      numValid++;
    }
  }

  return numValid;
};