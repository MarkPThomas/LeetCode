// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:00 min
// Patterns: Dynamic Programming - 1D
// Notes w.r.t. solution:

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  let f1 = 0;
  let f2 = 1;
  let result = n === 0 ? f1 : f1 + f2;
  for (let i = 2; i <= n; i++) {
    result = f1 + f2;
    f1 = f2;
    f2 = result;
  }
  return result;
};