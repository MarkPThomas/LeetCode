// 2025/05/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 1:30 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  const tranformedArr = [];
  for (let i = 0; i < arr.length; i++) {
    tranformedArr.push(fn(arr[i], i));
  }

  return tranformedArr;
};