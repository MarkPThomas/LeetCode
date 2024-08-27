// 202x/xx/xx
// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Binary Search, Recursion
// Notes w.r.t. solution: Binary exponentiation iterative solution.
//    Naiive solution modified with alg taken from editorial. :-P



// 2024/08/23
// O(log(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 10:37 min (time for naiive solution + modifying)
// Patterns: Recursion, Binary Search
// Notes w.r.t. solution: Binary exponentiation recursive solution.
//    Naiive solution modified with alg taken from editorial. :-P
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 1 / myPow(x, -n);
  }

  if (n % 2) {
    return x * myPow(x * x, (n - 1) / 2);
  } else {
    return myPow(x * x, n / 2);
  }
};


// 2024/08/23
// O(n) time complexity
// O(n) space complexity
// Time to complete: 9:04 min
// Patterns: Recursion
// Notes w.r.t. solution: Naiive/brute force recursive solution
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 0) {
    return 1;
  }

  if (n < 0) {
    return 1 / myPow(x, -n);
  }

  return x * myPow(x, n - 1);
};
