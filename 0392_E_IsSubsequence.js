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
var isSubsequence = function (s, t) {
  let ptrS = 0;
  for (let ptrT = 0; ptrT < t.length; ptrT++) {
    if (s[ptrS] === t[ptrT]) {
      ptrS++;
    }
  }
  return ptrS === s.length;
};