// 2024/04/23
// O(n) time complexity
// O(1) space complexity, since # chars is limited
// Time to complete: 7:36 min
// Patterns: Hash map
// Notes w.r.t. solution: Would have been 5:30 but made an in/of iteration error
/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
  const charFreq = {};
  for (let i = 0; i < s.length; i++) {
    if (!charFreq[s[i]]) {
      charFreq[s[i]] = 0;
    }
    charFreq[s[i]]++;
  }

  const numOddMax = s.length % 2 ? 1 : 0;
  let oddNum = 0;
  for (value of Object.values(charFreq)) {
    if (value % 2) {
      oddNum++;
      if (oddNum > numOddMax) {
        return false;
      }
    }
  }

  return true;
};


// 2023/06
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