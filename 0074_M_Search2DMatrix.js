// 2025/03/05
// O(log(m) + log(n)) time complexity
// O(1) space complexity
// Time to complete: 22:24 min
// Patterns: Binary Search
// Notes w.r.t. solution: Mostly solved in 9:52 but then had a variety of small edge cases & bugs to work through.
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length
  if (target < matrix[0][0]
    || matrix[m - 1][n - 1] < target) {
    return false;
  }

  // 1. Find row i <= target <= row j
  let rowLow = 0;
  let rowHigh = m - 1;
  while (rowLow < rowHigh) {
    const rowMid = rowLow + Math.floor((rowHigh - rowLow) / 2);
    if (matrix[rowMid][0] === target) {
      return true;
    } else if (matrix[rowMid][0] > target) {
      if (matrix[rowMid - 1][0] < target) {
        rowLow = rowMid - 1;
        break;
      }
      rowHigh = rowMid - 1;
    } else {
      if (matrix[rowMid + 1][0] > target) {
        rowLow = rowMid;
        break;
      }
      rowLow = rowMid + 1;
    }
  }

  // 2. Search row i for target
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (matrix[rowLow][mid] === target) {
      return true;
    } else if (matrix[rowLow][mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};