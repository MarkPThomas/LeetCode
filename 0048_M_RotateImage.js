// 2024/12/27
// O(m * n) time complexity
// O(1) space complexity
// Time to complete: 11:08 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  // Transpose
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 0; col < row; col++) {
      const swap = matrix[row][col];
      matrix[row][col] = matrix[col][row];
      matrix[col][row] = swap;
    }
  }

  // Reflect
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < Math.floor(matrix[0].length / 2); col++) {
      const swap = matrix[row][col];
      const colMirror = matrix[0].length - col - 1;

      matrix[row][col] = matrix[row][colMirror];
      matrix[row][colMirror] = swap;
    }
  }
};