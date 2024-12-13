// 2024/12/13
// O() time complexity
// O(1) space complexity
// Time to complete: OT min 41/49.
// Patterns:
// Notes w.r.t. solution: Window needed to shrink the left size.
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  let maxCount = 0;

  let startIdx = 0;
  let endIdx = 0;
  let nextStartIdx = 0;
  let kCurr = k;
  while (endIdx < s.length) {
    if (s[startIdx] === s[endIdx]) {
      // Grow window forward
      endIdx++;
    } else {
      if (!nextStartIdx) {
        nextStartIdx = endIdx;
      }

      if (kCurr) {
        // Grow window forward by at most k remaining
        kCurr--;
        endIdx++
      } else {
        // Take count, start over at last letter change w/ reset k
        maxCount = Math.max(maxCount, endIdx - startIdx);

        startIdx = nextStartIdx;
        nextStartIdx = 0;
        endIdx = startIdx;
        kCurr = k;
      }
    }
  }
  maxCount = Math.max(maxCount, endIdx - startIdx);

  return maxCount;
}