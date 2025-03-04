// 2025/03/04
// O(sqrt(n)*LogLog(n) + n) time complexity
// O(n) space complexity
// Time to complete: n/m min
// Patterns: Greek math genius
// Notes w.r.t. solution: This problem is dumb
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  if (n <= 2) {
    return 0;
  }

  let p = 2;
  const limit = Math.sqrt(n);
  const hasDivisors = new Array(n);
  for (p = 2; p <= limit; p++) {
    if (!hasDivisors[p]) {
      for (j = p * p; j < n; j += p) {
        hasDivisors[j] = true;
      }
    }
  }

  numberOfPrimes = 0;
  for (i = 2; i < n; i++) {
    if (!hasDivisors[i]) {
      numberOfPrimes++;
    }
  }
  return numberOfPrimes;
};