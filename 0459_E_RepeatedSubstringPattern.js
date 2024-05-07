// 2024/05/07
// O(n * sqrt(n)) time complexity - sqrt(n) for only checking at even divisors (i.e. mod = 0)
// O(m) space complexity
// Time to complete: 19:08 min - 10:40 min + 15:23 min & then 19:08 min for dumb debugging mistakes. Math :-P
// Patterns: Pattern Search
// Notes w.r.t. solution: Rabin-Karp would reduce time complexity but takes more time to add in to here
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    if (s.length % (i + 1) === 0) {
      pattern = s.substring(0, i + 1);

      let j = pattern.length;
      while (j <= s.length && pattern === s.substring(j, j + pattern.length)) {
        j += pattern.length;
      }

      if (j === s.length) {
        return true;
      }
    }
  }

  return false;
};