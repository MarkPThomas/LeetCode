// 2025/01/11
// O(n * SQRT(n)) time complexity
// O(n) space complexity
// Time to complete: 32:57 min
// Patterns: DP - Iteration/Combination
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  let num = 1;
  while (num ** 2 <= n) {
    const perfectNum = num ** 2;
    for (let i = perfectNum; i <= n; i++) {
      let count = Math.floor(i / perfectNum) + dp[i % perfectNum];

      dp[i] = Math.min(dp[i], count);
    }

    num++;
  }

  return dp[n];
};