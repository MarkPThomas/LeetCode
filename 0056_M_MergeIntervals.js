// O(n*log(n)) time complexity for sorting
// O(n) space complexity for sorting
// where n = # of intervals
// Time to complete: 15:00 min
// Patterns: Merge intervals
// Notes w.r.t. solution: Was a bit rushed, cost some time.

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length === 1) {
    return intervals;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [];
  let startInterval = intervals[0][0];
  let endInterval = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > endInterval) {
      mergedIntervals.push([startInterval, endInterval]);
      startInterval = intervals[i][0];
      endInterval = intervals[i][1]
    } else {
      endInterval = Math.max(endInterval, intervals[i][1]);
    }

    if (i === intervals.length - 1) {
      mergedIntervals.push([startInterval, endInterval]);
    }
  }

  return mergedIntervals;
};