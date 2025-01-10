// 2025/01/10
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: OT/16:41 min @ 34/59
// Patterns: Intervals
// Notes w.r.t. solution: I was close! Just was comparing lengths & handling pointers incorrectly.
//  Solution is my attempt modified to be correct.
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // Remove fewer larger overlapping intervals?
  // Larger also more likely to overlap more than 1
  // Once an overlap is found, note deltas, drop larger delta;

  intervals.sort((a, b) => a[0] - b[0]);

  let removedIntervals = 0;
  let prev = 0;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[prev][1]) {
      // Overlapping, remove one
      removedIntervals++;

      if (intervals[i][1] < intervals[prev][1]) {
        // prev is longer than current, keep shorter interval
        prev = i;
      }
    } else {
      // No overlap, update to current interval
      prev = i;
    }
  }

  return removedIntervals;
};