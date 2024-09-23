// 2024/09/23
// O(n) time complexity
// O(1) space complexity
// Time to complete: 6 min
// Patterns:  DP w/ variables
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  let trib1 = 0;
  if (!n) {
    return trib1;
  }

  let trib2 = 1;
  let trib3 = 1;
  if (n < 3) {
    return trib3;
  }

  let tribNext = 0;
  for (let i = 3; i <= n; i++) {
    tribNext = trib1 + trib2 + trib3;
    trib1 = trib2;
    trib2 = trib3;
    trib3 = tribNext;
  }

  return tribNext;
};

// 2024/09/23
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:02 min
// Patterns: DP w/ Tabulation/iteration
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  const dp = [];
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;

  if (n < 3) {
    return dp[n];
  }

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[dp.length - 1];
};