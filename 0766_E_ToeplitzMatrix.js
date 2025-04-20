// 2025/04/20
// O(n * m) time complexity
// O(1) space complexity
// Time to complete: 8:27 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
  // start from 0, 0
  //  increment by col in 1st row
  //  increment by row in 1st col
  //  decrement by +col, +row

  for (let row = 0; row < matrix.length; row++) {
    const num = matrix[row][0];

    let colDiag = 1;
    for (let rowDiag = row + 1; rowDiag < matrix.length; rowDiag++) {
      if (colDiag === matrix[0].length) {
        break;
      } else if (matrix[rowDiag][colDiag] !== num) {
        return false;
      } else {
        colDiag++;
      }
    }
  }

  for (let col = 1; col < matrix[0].length; col++) {
    const num = matrix[0][col];

    let rowDiag = 1;
    for (let colDiag = col + 1; colDiag < matrix[0].length; colDiag++) {
      if (rowDiag === matrix.length) {
        break;
      } else if (matrix[rowDiag][colDiag] !== num) {
        return false;
      } else {
        rowDiag++;
      }
    }
  }

  return true;
};