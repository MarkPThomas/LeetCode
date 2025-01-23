// 2025/01/22
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 7:27 min
// Patterns: Dynamic Programming - Matrix, Combination
// Notes w.r.t. solution:
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const totalWays = Array(m).fill().map(() => Array(n).fill(0));
  totalWays[0][0] = 1;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row > 0) {
        totalWays[row][col] += totalWays[row - 1][col];
      }

      if (col > 0) {
        totalWays[row][col] += totalWays[row][col - 1];
      }
    }
  }

  return totalWays[m - 1][n - 1];
};