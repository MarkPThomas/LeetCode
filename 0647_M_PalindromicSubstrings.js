// 2025/03/03
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 8:15 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  function countPalindromes(left, right, s) {
    let numPals = 0;

    while (0 <= left && right < s.length) {
      if (s[left] === s[right]) {
        numPals++;
        left--;
        right++;
      } else {
        break;
      }
    }

    return numPals;
  }

  let numPals = 0;

  for (let i = 0; i < s.length; i++) {
    // Check odd #
    numPals += countPalindromes(i, i, s);

    // Check even #
    numPals += countPalindromes(i, i + 1, s);
  }

  return numPals;
};