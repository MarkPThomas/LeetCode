// 2025/04/22
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4:01 min
// Patterns: Counter variable
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  const OPEN = '(';
  const CLOSE = ')';

  let maxDepth = 0;
  let currDepth = 0;
  for (const char of s) {
    if (char === OPEN) {
      currDepth++;
      maxDepth = Math.max(maxDepth, currDepth);
    } else if (char === CLOSE) {
      currDepth--;
    }
  }

  return maxDepth;
};