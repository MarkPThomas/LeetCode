// O(n * m) time complexity
// O(1) space complexity
// where n = # words, m = length of first/longest word
// Time to complete: 13:53 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string[]} words
 * @return {boolean}
 */
var validWordSquare = function (words) {
  if (words[0].length !== words.length) {
    return false;
  }

  const maxWordLength = words[0].length;

  for (let k = 0; k < words[0].length; k++) {
    if (words[k].length > maxWordLength) {
      return false;
    }

    for (let i = 0; i < words.length; i++) {
      if (words[i][k] !== words[k][i]) {
        return false;
      }
    }
  }

  return true;
};