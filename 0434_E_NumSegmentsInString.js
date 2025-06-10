// 2025/06/10
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4:34 min
// Patterns: String
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  let numSegments = 0;
  let isInSegment = false;
  for (const char of s) {
    if (char === ' ') {
      isInSegment = false;
    } else {
      if (!isInSegment) {
        numSegments++;
      }
      isInSegment = true;
    }
  }

  return numSegments;
};