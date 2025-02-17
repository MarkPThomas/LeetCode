// 2025/02/17
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Counting
// Notes w.r.t. solution: Worked solution
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  function getMaxValidLength(idx, closeChar) {
    if (s[idx] === closeChar) {
      closeCount++;
    } else {
      openCount++;
    }

    // closeCount <= openCount, else reset
    if (openCount === closeCount) {
      maxLength = Math.max(maxLength, 2 * closeCount);
    } else if (closeCount > openCount) {
      closeCount = 0;
      openCount = 0;
    }
  }

  let maxLength = 0;

  // Check from left-right (miss)
  let openCount = 0;
  let closeCount = 0;
  for (let i = 0; i < s.length; i++) {
    getMaxValidLength(i, ')');
  }

  // Check right-left
  openCount = 0;
  closeCount = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    getMaxValidLength(i, '(');
  }

  return maxLength;
};

// 2025/02/17
// O(n) time complexity
// O(n) space complexity
// Time to complete: OT min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  const OPEN = '(';

  let preIdx = -1;
  let maxLength = 0;
  const openIdxs = [preIdx];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === OPEN) {
      openIdxs.push(i);
    } else {
      openIdxs.pop();
      if (!openIdxs.length) {
        openIdxs.push(i);
      } else {
        maxLength = Math.max(maxLength, i - openIdxs[openIdxs.length - 1]);
      }
    }
  }

  return maxLength;
};