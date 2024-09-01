// 2024/09/01
// O(n * log(n)) time complexity, since each recursion is for half the width of the matrix
// O(log(n)) space complexity, since each recursion is for half the width of the matrix
// where n = m for simplicity (i.e. matrix assumed square)
// Time to complete: 24:13 min
// Patterns: Recursion, sub-problems, dynamic programming
// Notes w.r.t. solution: Would have been 15:24 but accidentally flipped matrix dimensions.
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  function findTarget(left, top, right, bottom) {
    if (right < left || bottom < top) {
      // Search space has reduced to nothing
      return false;
    }

    if (target < matrix[top][left] || matrix[bottom][right] < target) {
      // target out of bounds of matrix
      return false;
    }

    const colMid = left + Math.floor((right - left) / 2);

    let row = top;
    while (row <= bottom && matrix[row][colMid] <= target) {
      if (matrix[row][colMid] === target) {
        return true;
      }
      row++;
    }

    // There are two valid sub-matrices to check
    // Recurse down both to find if any are true
    return (
      findTarget(left, row, colMid - 1, bottom)      // Bottom-left
      || findTarget(colMid + 1, top, right, row - 1)); // Top-right
  }

  return findTarget(0, 0, matrix[0].length - 1, matrix.length - 1);
};