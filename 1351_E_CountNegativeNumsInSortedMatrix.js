// 2025/04/13
// O(m * log(n)) time complexity
// O(1) space complexity
// Time to complete: 7:49 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
  // m * log(n) to just find first + to - change on each row
  let numNegative = 0;
  for (let row = 0; row < grid.length; row++) {
    let left = 0;
    let right = grid[0].length - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (grid[row][mid] >= 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // left is largest/first negative
    numNegative += grid[row].length - left;
  }

  return numNegative;
};