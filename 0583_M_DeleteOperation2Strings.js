// 2025/03/21
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 4:11 min
// Patterns:  Dynamic Programming - LCS - Bottom-Up
// Notes w.r.t. solution: Attempt after seeing hint in editorial
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const dp = Array(word1.length + 1).fill().map(() => Array(word2.length + 1).fill(0));

  for (let i1 = word1.length - 1; i1 >= 0; i1--) {
    for (let i2 = word2.length - 1; i2 >= 0; i2--) {
      if (word1[i1] === word2[i2]) {
        dp[i1][i2] = dp[i1 + 1][i2 + 1] + 1;
      } else {
        dp[i1][i2] = Math.max(dp[i1 + 1][i2], dp[i1][i2 + 1]);
      }
    }
  }

  const LCS = dp[0][0];

  return word1.length + word2.length - 2 * LCS;
};

// 2025/03/21
// O() time complexity
// O(1) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming - LCS - Top-Down
// Notes w.r.t. solution: Close, but bugs either get infinity or off by 1
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // states: i1, i2 for each word
  const memo = Array(word1.length).fill().map(() => Array(word2.length));

  function dp(i1, i2) {
    // base case when words same length & matching
    // i.e. return true if past end of word
    if (i1 >= word1.length || i2 >= word2.length) {
      return i1 >= word1.length && i2 >= word2.length ? 0 : Infinity;
    }

    if (memo[i1][i2] !== undefined) {
      return memo[i1][i2];
    }

    let skip = Infinity;
    let delete1 = Infinity;
    let delete2 = Infinity;
    let deleteBoth = Infinity;
    // recurrence:
    if (word1[i1] === word2[i2]) {
      // 1. when both chars match, move forward
      skip = dp(i1 + 1, i2 + 1);
    }
    // } else {
    // 2. when there is a mismatch, try deleting 1 from 1 or the other, w/ +1 counted
    //  2a. Can only move forward when still in-bounds
    delete1 = dp(i1 + 1, i2) + 1;
    delete2 = dp(i1, i2 + 1) + 1;
    deleteBoth = dp(i1 + 1, i2 + 1) + 2;
    // }
    const numDelete = Math.min(skip, delete1, delete2, deleteBoth);

    memo[i1][i2] = numDelete;
    return numDelete;
  }

  const result = dp(0, 0);
  return result;
};