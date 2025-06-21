// 2025/06/21
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 34:11 min
// Patterns: Binary Search
// Notes w.r.t. solution: Got bogged down in some minor details - slow down! Also remembering new Binary Search template.
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function (intervals) {
  // starts unique, but not in order
  // if sort by start, then for each interval
  //  find first start >= end
  function getRightInterval(intervalEnd, intervalIdx, intervalStarts) {
    let left = 0;
    let right = intervalStarts.length;

    if (intervalEnd < intervalStarts[0][0]) {
      return intervalStarts[1];
    }

    while (right - left > 1) {
      const mid = left + Math.floor((right - left) / 2);

      if (intervalStarts[mid][0] < intervalEnd) {
        left = mid;
      } else {
        right = mid;
      }
    }

    return right >= intervalStarts.length ? -1 : intervalStarts[right][1];
  }

  const intervalStarts = [];
  for (let i = 0; i < intervals.length; i++) {
    intervalStarts.push([intervals[i][0], i]);
  }
  intervalStarts.sort((a, b) => a[0] - b[0]);

  const rightIntervals = [];
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][0] === intervals[i][1]) {
      rightIntervals.push(i);
    } else {
      const rightInterval = getRightInterval(intervals[i][1], i, intervalStarts);
      rightIntervals.push(rightInterval);
    }
  }

  return rightIntervals;
};