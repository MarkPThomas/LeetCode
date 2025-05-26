// 2025/05/26
// O(1) time complexity
// O(1) space complexity
// Time to complete: 2:21 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number} num
 * @return {boolean}
 */
var isSameAfterReversals = function (num) {
  // reversal is the same so long as there are no trailing->leading zeros

  return !num || num % 10;
};