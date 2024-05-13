// 2025/05/13
// O(m * n) time complexity
// O(1) space complexity
// where m = width of array, n = height of array
// Time to complete: 23:36 min
// Patterns: Simulation
// Notes w.r.t. solution: Several false starts. Slow down, draw things out carefully.
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function (mat) {
  let result = [];

  let count = mat.length * mat[0].length;
  let isPositive = true;
  let i = 0;
  let j = 0;

  while (count) {
    result.push(mat[i][j]);
    count--;

    if (isPositive) {
      i--;
      j++;

      // Flip direction
      if (i < 0 || j === mat[0].length) {
        isPositive = !isPositive;
      }

      // Reset increment as appropriate
      if (j === mat[0].length) {
        i += 2;
        j--;
      } else if (i < 0) {
        i++;
      }
    } else {
      i++;
      j--;

      // Flip direction
      if (j < 0 || i === mat.length) {
        isPositive = !isPositive;
      }

      // Reset increment as appropriate
      if (i === mat.length) {
        j += 2;
        i--;
      } else if (j < 0) {
        j++;
      }
    }
  }

  return result;
};