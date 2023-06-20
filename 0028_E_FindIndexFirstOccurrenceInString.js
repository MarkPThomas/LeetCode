// O(n * m) time complexity
// O(1) space complexity
// where n = length of haystack, m = length of needle
// Time to complete: 5:00 min
// Patterns: Sliding window
// Notes w.r.t. solution:

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (haystack.length < needle.length) {
    return -1;
  }

  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack[i] === needle[0]) {
      let isMatch = true;
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        return i;
      }
    }
  }
  return -1;
};