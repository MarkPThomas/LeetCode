// 2025/05/10
// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:40 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  const letters = new Set();
  for (const char of sentence) {
    if (!letters.has(char)) {
      letters.add(char);

      if (letters.size === 26) {
        return true;
      }
    }
  }

  return false;
};