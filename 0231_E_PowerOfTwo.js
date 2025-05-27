// 2025/05/27
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 2:57 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  // 2^x >= n
  let power = 1;
  while (power <= n) {
    if (power === n) {
      return true;
    }
    power *= 2;
  }

  return false;
};