// 2024/03/17
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4:58 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence202403 = function (s, t) {
  if (s === '') {
    return true;
  }
  if (t.length < s.length) {
    return false;
  }

  let sPtr = 0;
  for (let tPtr = 0; tPtr < t.length; tPtr++) {
    if (s[sPtr] === t[tPtr]) {
      sPtr++;
      if (sPtr === s.length) {
        return true;
      }
    }
  }
  return false;
};


// 20203/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence2023 = function (s, t) {
  let ptrS = 0;
  for (let ptrT = 0; ptrT < t.length; ptrT++) {
    if (s[ptrS] === t[ptrT]) {
      ptrS++;
    }
  }
  return ptrS === s.length;
};