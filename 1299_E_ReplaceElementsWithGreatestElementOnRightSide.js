// 2024/05/16
// O(n) time complexity
// O(1) space complexity
// Time to complete: 13:30 min
// Patterns:
// Notes w.r.t. solution: Read problem description carefully. Started incorrect implementations twice.
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {
  let max = arr[arr.length - 1];

  for (let i = arr.length - 2; 0 <= i; i--) {
    const lastVal = arr[i];
    arr[i] = max;
    if (lastVal > max) {
      max = lastVal;
    }
  }

  // Flip last digit to -1;
  arr[arr.length - 1] = -1;

  return arr;
};