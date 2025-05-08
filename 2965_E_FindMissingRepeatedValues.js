// 2025/05/07
// O(n^2) time complexity
// O(n^2) space complexity
// Time to complete: 5:47 min
// Patterns: Set/Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  const nums = new Set();

  let a = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const num = grid[row][col];
      if (nums.has(num)) {
        a = num;
      } else {
        nums.add(num);
      }
    }
  }

  let b = 0;
  for (let i = 1; i <= grid.length * grid[0].length; i++) {
    if (!nums.has(i)) {
      b = i;
      break;
    }
  }

  return [a, b];
};