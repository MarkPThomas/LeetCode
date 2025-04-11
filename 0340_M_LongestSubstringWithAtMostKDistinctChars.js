// 2025/04/11
// O(n) time complexity
// O(k) -> O(1) space complexity (since k limited to 50 chars)
// Time to complete: 17:11 min
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  if (k === 0) {
    return 0;
  }

  let maxLength = 0;

  const charFreq = {};
  let numDistinct = 0;

  let left = 0;
  let right = 0;
  while (right < s.length) {
    const charIn = s[right];
    if (!(charIn in charFreq)) {
      charFreq[charIn] = 1;
      numDistinct++;
    } else {
      charFreq[charIn]++;
    }

    while (numDistinct > k && left <= right) {
      const charOut = s[left];
      charFreq[charOut]--;
      if (charFreq[charOut] === 0) {
        delete charFreq[charOut];
        numDistinct--;
      }

      left++;
    }

    if (numDistinct === k) {
      maxLength = Math.max(maxLength, right - left + 1);
    }

    right++;
  }

  maxLength = Math.max(maxLength, right - left);

  return maxLength;
};