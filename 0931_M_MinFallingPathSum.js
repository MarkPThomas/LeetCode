// 2025/01/22
// O(m * n) time complexity
// O(1) space complexity
// Time to complete: 13:55 min
// Patterns: Dynamic Programming - Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  const minSums = Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(Infinity));
  let minSum = Infinity;

  // Process row-by-row
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (row === 0) { // Base cases are initial row
        minSums[0][col] = matrix[row][col];
      } else {
        let prevMinSum = Math.min(
          minSums[row - 1][col],
          minSums[row - 1][col - 1] ?? Infinity,  // Check left diagonal
          minSums[row - 1][col + 1] ?? Infinity)  // Check right diagonal

        minSums[row][col] = matrix[row][col] + prevMinSum;
      }
    }

    // Get min value from bottom row
    if (row === matrix.length - 1) {
      for (let col = 0; col < matrix[0].length; col++) {
        minSum = Math.min(minSum, minSums[row][col]);
      }
    }
  }

  return minSum;
};