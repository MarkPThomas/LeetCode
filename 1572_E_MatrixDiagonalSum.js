// 2024/09/07
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:37 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
  let sum = 0;
  for (let i = 0; i < mat.length; i++) {
    sum += mat[i][i];

    let colIdx = mat.length - 1 - i;
    if (i !== colIdx) {
      sum += mat[i][colIdx];
    }
  }

  return sum;
};