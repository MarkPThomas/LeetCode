// 2024/08/29
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:54 min
// Patterns: Dynamic Programming, Recursion, Memoization
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const memo = {};

  function climbAllStairs(i, n) {
    if (i > n) {
      return 0;
    }

    if (i === n) {
      return 1;
    }

    if (memo[i] > 0) {
      return memo[i];
    }

    memo[i] = climbAllStairs(i + 1, n) + climbAllStairs(i + 2, n);
    return memo[i];
  }

  return climbAllStairs(0, n);
};