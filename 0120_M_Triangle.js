// 2025/03/25
// O(r * c) time complexity
// O(c) space complexity
//  where r = # rows, c = # cols at last row (max # cols)
// Time to complete: 15:39 min (4:02 min add'tl time refactoring from bottom-up)
// Patterns: Dynamic Programming - Bottom-Up w/ State Reduction
// Notes w.r.t. solution:
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {

  let prevMinSum = Array(triangle[triangle.length - 1].length + 1).fill(0);

  for (let row = triangle.length - 1; row >= 0; row--) {
    const nextMinSum = []
    for (let col = 0; col < triangle[row].length; col++) {
      const leftSum = prevMinSum[col];
      const rightSum = prevMinSum[col + 1];
      nextMinSum[col] = Math.min(leftSum, rightSum) + triangle[row][col];
    }

    prevMinSum = nextMinSum;
  }

  return prevMinSum[0];
};

// 2025/03/25
// O(r * c) time complexity
// O(r * c) space complexity
//  where r = # rows, c = # cols at last row (max # cols)
// Time to complete: 11:37 min (3:44 min add'tl time refactoring from top-down)
// Patterns: Dynamic Programming - Bottom-Up
// Notes w.r.t. solution:
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {

  const dp = Array(triangle.length + 1).fill().map(
    () => Array(triangle[triangle.length - 1].length + 1).fill(0));

  for (let row = triangle.length - 1; row >= 0; row--) {
    for (let col = 0; col < triangle[row].length; col++) {
      const leftSum = dp[row + 1][col];
      const rightSum = dp[row + 1][col + 1];
      dp[row][col] = Math.min(leftSum, rightSum) + triangle[row][col];
    }
  }

  return dp[0][0];
};

// 2025/03/25
// O(r * c) time complexity
// O(r * c) space complexity
//  where r = # rows, c = # cols at last row (max # cols)
// Time to complete: 7:53 min
// Patterns: Dynamic Programming - Top-Down
// Notes w.r.t. solution:
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {

  const memo = Array(triangle.length).fill().map(
    () => Array(triangle[triangle.length - 1].length))

  function dp(row, col) {
    if (row >= triangle.length || col >= triangle[row].length) {
      return 0;
    }
    if (memo[row][col] !== undefined) {
      return memo[row][col];
    }

    const leftSum = dp(row + 1, col);
    const rightSum = dp(row + 1, col + 1);
    const minSum = Math.min(leftSum, rightSum) + triangle[row][col];

    memo[row][col] = minSum;
    return minSum;
  }

  return dp(0, 0);
};