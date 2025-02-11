// 2025/02/11
// O(n^2) time complexity
// O(n^2) space complexity
//  where n = # rows, # cols
// Time to complete: 7:20 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  const rows = {};
  for (let row = 0; row < grid.length; row++) {
    const keys = [];
    for (let col = 0; col < grid[0].length; col++) {
      keys.push(grid[row][col]);
    }
    const key = keys.join('-');
    rows[key] ??= [];
    rows[key].push(row);
  }

  let numPairs = 0;
  for (let col = 0; col < grid[0].length; col++) {
    const keys = [];
    for (let row = 0; row < grid.length; row++) {
      keys.push(grid[row][col]);
    }
    const key = keys.join('-');

    if (key in rows) {
      numPairs += rows[key].length;
    }
  }

  return numPairs;
};