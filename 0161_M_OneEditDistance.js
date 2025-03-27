// 2025/03/27
// O(n) time complexity
// O(1) space complexity
// Time to complete: 10:39 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
  if (Math.abs(s.length - t.length) > 1 || s === t) {
    return false;
  }

  let diffCount = 0;
  if (s.length === t.length) {
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== t[i]) {
        diffCount++;
        if (diffCount > 1) {
          return false;
        }
      }
    }
  } else {
    const short = s.length < t.length ? s : t;
    const long = s.length < t.length ? t : s;

    let iShort = 0;
    let iLong = 0;
    while (iShort < short.length && iLong < long.length) {
      if (short[iShort] === long[iLong]) {
        iShort++;
      } else {
        diffCount++;
        if (diffCount > 1) {
          return false;
        }
      }
      iLong++;
    }
  }

  return true;
};