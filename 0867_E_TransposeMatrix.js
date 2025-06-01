// 2025/06/01
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 5:54 min
// Patterns: Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
  // row = col, col = row
  // m !== n, so generate new matrix
  const transpose = Array(matrix[0].length).fill().map(() => Array(matrix.length));
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      transpose[col][row] = matrix[row][col];
    }
  }

  return transpose;
};