// 2024/09/19
// O(m + n) time complexity
// O(1) space complexity
// where m = length of s, n = length of t
// Time to complete: 17:04 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  function movePtr(s, sIdx) {
    if (sIdx < 0) {
      return sIdx;
    }

    let count = 0;
    while (s[sIdx] === '#' || count) {
      if (s[sIdx] === '#') {
        count++;
      } else if (count) {
        count--;
      }
      sIdx--;
    }

    return sIdx;
  }

  let sIdx = s.length - 1;
  let tIdx = t.length - 1;
  while (0 <= sIdx && 0 <= tIdx) {
    sIdx = movePtr(s, sIdx);
    tIdx = movePtr(t, tIdx);

    if (s[sIdx] !== t[tIdx]) {
      return false;
    }
    sIdx--;
    tIdx--;
  }

  sIdx = movePtr(s, sIdx);
  tIdx = movePtr(t, tIdx);

  return sIdx < 0 && tIdx < 0;
};


// 2024/09/19
// O(m + n) time complexity
// O(m + n) space complexity
// where m = length of s, n = length of t
// Time to complete: 5:04 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  // reduce s & t
  function reduce(s) {
    const sStack = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '#') {
        sStack.pop();
      } else {
        sStack.push(s[i]);
      }
    }
    return sStack;
  }

  const sStack = reduce(s);
  const tStack = reduce(t);

  // compare s & t
  if (sStack.length !== tStack.length) {
    return false;
  }
  return sStack.join('') === tStack.join('');
};