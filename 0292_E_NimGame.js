// 2025/06/10
// O(1) time complexity
// O(1) space complexity
// Time to complete: 5:39 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
  // must always remove at least 1
  // win if <= 3 remaining on turn
  return n % 4;
};