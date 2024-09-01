// 2024/09/01
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 2:40 min
// Patterns: Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canMakeArithmeticProgression = function (arr) {
  arr.sort((a, b) => a - b);

  let change = null;
  for (let i = 1; i < arr.length; i++) {
    const currChange = arr[i] - arr[i - 1];
    if (change === null) {
      change = currChange;
    } else if (change !== currChange) {
      return false;
    }
  }

  return true;
};