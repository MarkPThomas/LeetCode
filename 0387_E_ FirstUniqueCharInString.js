// 2024/04/27
// O(n) time complexity
// O(n) -> O(1) space complexity for constant length of alphabet
// Time to complete: 5:36 min
// Patterns: Hashmap
// Notes w.r.t. solution: Should have solved much faster. Jumped in a tad too fast.

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const indices = {};

  for (let i = 0; i < s.length; i++) {
    if (!indices[s[i]]) {
      indices[s[i]] = 0;
    }
    indices[s[i]]++;
  }

  for (let i = 0; i < s.length; i++) {
    if (indices[s[i]] === 1) {
      return i;
    }
  }

  return -1;
};