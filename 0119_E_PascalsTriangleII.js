// O(k^2) time complexity
// O(k) space complexity
// Time to complete: 12:13 min
// Patterns: Dynamic Programming, Tabulation
// Notes w.r.t. solution: Was solved in 4:03 min but with minor errors to debug out. Slow down!
/**
* @param {number} rowIndex
* @return {number[]}
*/
var getRow = function (rowIndex) {
  // generate Pascal's Triangle
  // we only need to preserve prior row to make the next row
  let rPrev = [1];

  for (let i = 1; i <= rowIndex; i++) {
    let rCurr = [];
    for (let j = 0; j <= i; j++) {
      let left = (0 < j) ? rPrev[j - 1] : 0;
      let right = j < rPrev.length ? rPrev[j] : 0;
      let sum = left + right ?? 0;

      rCurr.push(sum);
    }
    rPrev = rCurr;
  }

  return rPrev;
};