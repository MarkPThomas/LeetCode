// 2024/09/26
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = length of string 1
//    n = length of string 2
// Time to complete: 16:04 min
// Patterns: DP, bottom-up, LCS
// Notes w.r.t. solution:
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const dp = Array(text1.length + 1).fill().map(() => Array(text2.length + 1).fill(0));
  dp[0][0] = 0;

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
};

// ===== Solutions =====
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = length of string 1
//    n = length of string 2
// Patterns: DP, top-down, LCS
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const memo = Array(text1.length + 1).fill().map(() => Array(text2.length + 1));

  function dp(i1, i2) {
    if (i1 === text1.length || i2 === text2.length) {
      return 0;
    }

    if (memo[i1][i2] !== undefined) {
      return memo[i1][i2];
    }

    let result = 0;
    if (text1[i1] === text2[i2]) {
      result = dp(i1 + 1, i2 + 1) + 1;
    } else {
      result = Math.max(dp(i1 + 1, i2), dp(i1, i2 + 1));
    }

    memo[i1][i2] = result;
    return result;
  }

  return dp(0, 0);
};

// O(m * n) time complexity
// O(m * n) space complexity
//  where m = length of string 1
//    n = length of string 2
// Patterns: DP, bottom-up, LCS
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const dp = Array(text1.length + 1).fill().map(() => Array(text2.length + 1).fill(0));

  for (let i2 = 1; i2 <= text2.length; i2++) {
    for (let i1 = 1; i1 <= text1.length; i1++) {
      if (text1[i1 - 1] === text2[i2 - 1]) {
        dp[i1][i2] = dp[i1 - 1][i2 - 1] + 1;
      } else {
        dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
};

// O(m * n) time complexity
// O(m) space complexity
//  where m = length of shorter string
//    n = length of longer string
// Patterns: DP, bottom-up w/ state reduction, LCS
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  if (text2.length < text1.length) {
    const tmp = text1;
    text1 = text2;
    text2 = tmp;
  }

  let dp = Array(text1.length + 1).fill(0);
  let dpNext = [...dp];

  for (let i2 = 1; i2 <= text2.length; i2++) {
    for (let i1 = 1; i1 <= text1.length; i1++) {
      if (text1[i1 - 1] === text2[i2 - 1]) {
        dpNext[i1] = dp[i1 - 1] + 1;
      } else {
        dpNext[i1] = Math.max(dp[i1], dpNext[i1 - 1]);
      }
    }

    const tmp = dp;
    dp = dpNext;
    dpNext = tmp;
  }


  return dp[text1.length];
};