// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:00 min
// Patterns: Hash map
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
  // for each letter count, must be an even #
  // if s is odd length, than 1 letter may have an odd # count
  const letterCounts = {};
  for (let i = 0; i < s.length; i++) {
    if (!letterCounts[s[i]]) {
      letterCounts[s[i]] = 0;
    }
    letterCounts[s[i]]++;
  }

  let isEvenLength = s.length % 2 === 0;
  let oddLetter = null;
  for ([letter, count] of Object.entries(letterCounts)) {
    if (count % 2) {
      if (isEvenLength || oddLetter) {
        return false;
      }
      oddLetter = letter;
    }
  }
  return true;
};