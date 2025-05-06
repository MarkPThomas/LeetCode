// 2025/05/06
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 7:31 min
// Patterns: Math
// Notes w.r.t. solution:
/**
* @param {number} n
* @return {number}
*/
var numberOfMatches = function (n) {
  let numMatches = 0;

  while (n > 1) {
    if (n % 2) {
      numMatches += (n - 1) / 2;
      n = Math.floor((n - 1) / 2) + 1;
    } else {
      numMatches += n / 2;
      n = Math.floor(n / 2);
    }
  }

  return numMatches;
};