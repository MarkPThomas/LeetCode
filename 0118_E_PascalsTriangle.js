// 2024/05/04
// O(n^2) time complexity
// O(1) space complexity if ignoring output
// Time to complete: 19:30 min
// Patterns: Dynamic - Tabulation
// Notes w.r.t. solution: Would have been more like 6-10 min but was getting tripped up on indices.

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let result = [];

  for (let i = 0; i < numRows; i++) {
    let row = [];

    for (let j = 0; j < i + 1; j++) {
      let sum = 0;

      if (i === 0) {
        sum += 1;
      } else if (j < i) {
        sum += result[i - 1][j];
      }

      if (i > 0 && j > 0) {
        sum += result[i - 1][j - 1];
      }

      row.push(sum);
    }

    result.push(row)
  }

  return result;
};