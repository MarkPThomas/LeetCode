// 2025/02/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Merge Interval
// Notes w.r.t. solution: Refactored solution
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  if (!intervals.length) { // No intervals to insert within
    return [newInterval];
  } else if (newInterval[1] < intervals[0][0]) { // New ends before first interval starts
    // Prepend new interval
    return [newInterval, ...intervals];
  } else if (intervals[intervals.length - 1][1] < newInterval[0]) { // New starts after all intervals end
    // Append new interval
    return [...intervals, newInterval];
  }

  const updatedIntervals = [];
  let i = 0;
  while (i < intervals.length) {
    updatedIntervals.push(intervals[i]);

    // Insert new interval if no overlap, or merge if overlap
    if (intervals[i][1] < newInterval[0] && i < intervals.length - 1 && newInterval[1] < intervals[i + 1][0]) {
      updatedIntervals.push(newInterval);
    } else if (newInterval[0] <= intervals[i][1] // New starts at/before curr ends
      && intervals[i][0] <= newInterval[1]) {  // New ends at/after curr starts
      // Merge w/ curr
      const start = Math.min(intervals[i][0], newInterval[0]);
      let end = Math.max(intervals[i][1], newInterval[1]);

      // Merge over any additional overlaps of later intervals
      while (i + 1 < intervals.length && intervals[i + 1][0] <= end) {
        end = Math.max(intervals[i + 1][1], newInterval[1]);
        i++;
      }

      updatedIntervals[updatedIntervals.length - 1] = [start, end];
    }

    i++;
  }

  return updatedIntervals;
};

// 2025/02/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 39:42 min
// Patterns: Merge Interval
// Notes w.r.t. solution: Mostly solved under time.
//  Should have listed out cases & checks more carefully in comments before coding.
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  if (!intervals.length) {
    return [newInterval];
  }

  function getIntervalEnd(intervals, newInterval, i) {
    let end = Math.max(intervals[i][1], newInterval[1]);

    // Merge over any additional overlaps of later intervals
    i++;
    while (i < intervals.length && end >= intervals[i][0]) {
      end = Math.max(intervals[i][1], newInterval[1]);
      i++;
    }

    return [end, i];
  }

  const updatedIntervals = [];
  let intervalAdded = false;
  let i = 0;
  while (i < intervals.length) {
    if (intervalAdded) {
      // Add remaining intervals as-is
      updatedIntervals.push(intervals[i]);
      i++;
    } else if (newInterval[1] < intervals[i][0]) { // New ends before first curr begins
      // Insert new interval first
      updatedIntervals.push(newInterval);
      updatedIntervals.push(intervals[i]);
      intervalAdded = true;
      i++;
    } else if (intervals[i][1] < newInterval[0] &&  // Curr ends before new
      (i === intervals.length - 1 || newInterval[1] < intervals[i + 1][0])) { // Curr is last or next begins after new
      // Insert between existing intervals
      updatedIntervals.push(intervals[i]);
      updatedIntervals.push(newInterval);
      intervalAdded = true;
      i++;
    } else if (newInterval[0] <= intervals[i][1] // New starts at/before curr ends
      && intervals[i][0] <= newInterval[1]) {  // New ends at/after curr starts
      // Merge w/ curr & any proceeding
      const start = Math.min(intervals[i][0], newInterval[0]);
      const [end, nextI] = getIntervalEnd(intervals, newInterval, i);
      i = nextI;
      updatedIntervals.push([start, end]);
      intervalAdded = true;
    } else {
      // Add existing intervals
      updatedIntervals.push(intervals[i]);
      i++;
    }
  }

  return updatedIntervals;
};