// 2025/06/20
// O(n) time complexity
// O(1) space complexity
// Time to complete: 28:48 min
// Patterns: Merge Interval
// Notes w.r.t. solution: Would have solved faster, but jumped into coding too quickly, also minor big on interval exclusion.
/**
 * @param {number[][]} intervals
 * @param {number[]} toBeRemoved
 * @return {number[][]}
 */
var removeInterval = function (intervals, toBeRemoved) {
  const intervalsUpdated = [];

  for (const interval of intervals) {
    if (toBeRemoved[1] <= interval[0] || interval[1] <= toBeRemoved[0]) {
      // No overlap - save as-is
      intervalsUpdated.push([...interval]);
    } else { // Overlaps - creates 2 new intervals at most
      // Segment before remove interval
      let start1 = interval[0];
      let end1 = toBeRemoved[0];
      if (start1 < end1) {
        intervalsUpdated.push([start1, end1]);
      }

      // Segment after remove interval
      let start2 = toBeRemoved[1];
      let end2 = interval[1];
      if (start2 < end2) {
        intervalsUpdated.push([start2, end2]);
      }
    }
  }

  return intervalsUpdated;
};