// 2025/03/16
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = nums1 length, n = nums2 length
// Time to complete: 24:53 min
// Patterns: Dynamic Programming (LCS)
// Notes w.r.t. solution: Bottom-Up
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  const dp = Array(nums1.length + 1).fill().map(() => Array(nums2.length + 1).fill(0));

  let maxLen = 0;
  for (let i1 = nums1.length - 1; i1 >= 0; i1--) {
    for (let i2 = nums2.length - 1; i2 >= 0; i2--) {
      if (nums1[i1] === nums2[i2]) {
        dp[i1][i2] = dp[i1 + 1][i2 + 1] + 1;
        maxLen = Math.max(maxLen, dp[i1][i2]);
      }
    }
  }

  return maxLen;
};

// 2025/03/16
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = nums1 length, n = nums2 length
// Time to complete: 21:24 min @ 32/55
// Patterns: Dynamic Programming (LCS)
// Notes w.r.t. solution: Top-Down
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  const memo = Array(nums1.length).fill().map(() => Array(nums2.length));

  function dp(i1, i2, len) {
    if (i1 === nums1.length || i2 === nums2.length) {
      return len;
    }

    if (memo[i1][i2] !== undefined) {
      return memo[i1][i2];
    }

    let result = len;
    if (nums1[i1] === nums2[i2]) {
      result = Math.max(len + 1, dp(i1 + 1, i2 + 1, len + 1));
    } else {
      result = Math.max(
        len,
        dp(i1 + 1, i2, 0),
        dp(i1, i2 + 1, 0),
        // dp(i1 + 1, i2 + 1, 0)
      );
    }

    memo[i1][i2] = result;
    return result;
  }

  const result = dp(0, 0, 0);
  return result;
};