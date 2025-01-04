// 2025/01/04
// O(n) time complexity
// O(m)->O(1) space complexity
//  where n = length of string,
//    m = # chars = constant 26 here
// Time to complete: 10:45/13:32 min
// Patterns: Sliding Window
// Notes w.r.t. solution: Solved in 10:45. Optimized through 13:32 for counting maxFreq.
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  // const charCounts = new PriorityQueue((a, b) => b[1] - a[1]);
  const charCounts = {};
  let maxLength = 0;
  let maxFreq = 0;

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    charCounts[s[right]] ||= 0;
    charCounts[s[right]]++;

    // char to use is the one that occurs the most times
    maxFreq = Math.max(maxFreq, charCounts[s[right]]);

    // Window is valid if window length - charToUse freq <= k
    const currLength = right - left + 1;
    if (currLength - maxFreq <= k) {
      maxLength = Math.max(maxLength, currLength);
    } else {
      charCounts[s[left]]--;
      left++;
      // Note: maxFreq is temporarily out of date by potentially being too large.
      //  This is OK as it only matters when we potentially have a larger window.
      //  By being too large, all that happes is:
      //      1. We check maxLength more
      //      2. We shrink the window less
      //  This is corrected when we encounter the next increase in maxFreq.
    }
  }


  return maxLength;
}


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