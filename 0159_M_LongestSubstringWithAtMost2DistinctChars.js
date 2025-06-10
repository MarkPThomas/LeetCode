// 2025/06/10
// O(n) time complexity
// O(n) -> O(1) space complexity (since #charTypes <= 26)
// Time to complete: 10:30 min
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let MAX_DISTINCT = 2;
  let numDistinct = 0;

  let maxLength = 0;
  const charCounts = {};
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const charIn = s[right];
    if (!charCounts[charIn]) {
      charCounts[charIn] = 1;
      numDistinct++;
    } else {
      charCounts[charIn]++;
    }

    while (numDistinct > MAX_DISTINCT && left < right) {
      const charOut = s[left];
      charCounts[charOut]--;
      if (charCounts[charOut] === 0) {
        numDistinct--;
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return Math.max(maxLength, s.length - left);
};