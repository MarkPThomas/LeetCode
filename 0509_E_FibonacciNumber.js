// 2024/08/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:56 min
// Patterns: Dynamic Programming - 1D, Recursion, Memoization
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const calcs = { 0: 0, 1: 1 }

  function fibRecurse(n) {
    if (calcs.hasOwnProperty(n)) {
      return calcs[n];
    }

    const result = fibRecurse(n - 1) + fibRecurse(n - 2);
    calcs[n] = result;

    return result;
  }

  return fibRecurse(n);
};

// 2023/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:00 min
// Patterns: Dynamic Programming - 1D, Tabulation
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