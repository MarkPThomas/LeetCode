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
  let k = 0;
  while (k < words.length && k < words[0].length) {
    if (words[k].length > words.length) {
      return false;
    }

    for (let i = 0; i < words.length; i++) {
      if (words[i][k] !== words[k][i]) {
        return false;
      }
    }
    k++;
  }

  return true;
};