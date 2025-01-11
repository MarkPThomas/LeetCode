// 2025/01/11
// O(n * SQRT(n)) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: DP - Iteration/Combination/Knapsack
// Notes w.r.t. solution: Improved speed of prior solution w/ pre-calculated squares
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  const maxSquare = Math.sqrt(n) + 1;
  const squareNums = [];
  for (let i = 1; i < maxSquare; i++) {
    squareNums[i] = i * i;
  }

  for (const squareNum of squareNums) {
    for (let i = squareNum; i <= n; i++) {
      let count = Math.floor(i / squareNum) + dp[i % squareNum];

      dp[i] = Math.min(dp[i], count);
    }
  }

  return dp[n];
};

// 2025/01/11
// O(n * SQRT(n)) time complexity
// O(n) space complexity
// Time to complete: 32:57 min
// Patterns: DP - Iteration/Combination/Knapsack
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