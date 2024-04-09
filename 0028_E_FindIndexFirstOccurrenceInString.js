// 2024/04/09
// O(n * m) time complexity
// where n = length of haystack, m = length of needle
// O(1) space complexity
// Time to complete: 4:45 min
// Patterns: Double sliding window
// Notes w.r.t. solution:
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack[i] === needle[0]) {
      for (let j = 0; j < needle.length; j++) {
        if (haystack[i + j] !== needle[j]) {
          break;
        }
        if (j === needle.length - 1) {
          return i;
        }
      }
    }
  }


  return -1;
};

// 2023/06
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
var strStr2023 = function (haystack, needle) {
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