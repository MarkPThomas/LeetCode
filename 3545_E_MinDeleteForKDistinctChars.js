// 2025/06/03
// O(n) time complexity
// O(26) -> O(1) space complexity
// Time to complete: 5:08 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minDeletion = function (s, k) {
  // delete chars by ascending order of frequency until we have k char types
  const chars = {};
  for (const char of s) {
    chars[char] = (chars[char] ?? 0) + 1;
  }

  const charCounts = Object.values(chars);
  charCounts.sort((a, b) => a - b);

  // Delete chars types from lowest until k remain
  let deletions = 0;
  for (let i = 0; i < charCounts.length - k; i++) {
    deletions += charCounts[i];
  }
  return deletions;
};