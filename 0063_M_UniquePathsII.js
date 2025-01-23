// 2025/01/22
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 4:54 min
// Patterns: Dynamic Programming - Matrix, Combination
// Notes w.r.t. solution:
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const obstacle = 1;

  const totalWays = Array(m).fill().map(() => Array(n).fill(0));
  totalWays[0][0] = obstacleGrid[0][0] !== obstacle ? 1 : 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row > 0 && obstacleGrid[row][col] !== obstacle) {
        totalWays[row][col] += totalWays[row - 1][col];
      }

      if (col > 0 && obstacleGrid[row][col] !== obstacle) {
        totalWays[row][col] += totalWays[row][col - 1];
      }
    }
  }

  return totalWays[m - 1][n - 1];
};