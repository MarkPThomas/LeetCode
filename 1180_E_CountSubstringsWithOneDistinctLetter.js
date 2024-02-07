// O(n) time complexity
// O(1) space complexity
// where n = length of string
// Time to complete: 40 min + 3 min optimize
// Patterns: Math (although I missed the sum solution). Optional Dynamic.
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var countLetters = function (s) {
  let i = 0;
  let j = 1;
  let uniqueChar = s[0];
  let count = 0;

  while (j <= s.length) {
    if (s[j] !== uniqueChar) {
      uniqueChar = s[j];

      let subCount = 1;
      while (i < j) {
        count += subCount;
        i++;
        subCount++;
      }
    }

    j++;
  }

  return count;
};