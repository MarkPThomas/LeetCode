// 2025/01/22
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 6:47 min
// Patterns: Dynamic Programming - Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const minSum = Array(grid.length).fill().map(() => Array(grid[0].length).fill(Infinity));
  minSum[0][0] = grid[0][0];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (row > 0) {
        minSum[row][col] = grid[row][col] + minSum[row - 1][col];
      }

      if (col > 0) {
        minSum[row][col] = Math.min(minSum[row][col],
          grid[row][col] + minSum[row][col - 1]);
      }
    }
  }

  return minSum[grid.length - 1][grid[0].length - 1];
};