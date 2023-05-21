// O(p) time complexity
// O(m + n) space complexity
// m = length of word1, n = length of word2, p = max(m, n) -> m + n
// Time to complete: 3 min
// Patterns: Array/String
// Notes w.r.t. solution:
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const mergedLetters = [];
  let length = Math.max(word1.length, word2.length);
  for (let i = 0; i < length; i++) {
    if (i < word1.length) {
      mergedLetters.push(word1[i]);
    }
    if (i < word2.length) {
      mergedLetters.push(word2[i]);
    }
  }
  return mergedLetters.join('');
};