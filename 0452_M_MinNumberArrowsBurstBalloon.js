// 2025/01/15
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 22:14 min
// Patterns: Greedy, Merge Intervals
// Notes w.r.t. solution:
/**
* @param {number[][]} points
* @return {number}
*/
var findMinArrowShots = function (points) {
  // shoot arrows at overlaps in balloons
  // shoot arrow at end of earliest overlap

  points.sort((a, b) => a[1] - b[1]);

  let arrows = 0;
  let prev = 0;
  let curr = 1;
  while (prev < points.length) {
    arrows++;

    // remove all overlaps of earliest end
    while (curr < points.length && points[curr][0] <= points[prev][1]) {
      curr++;
    }

    prev = curr;
    curr++;
  }

  return arrows;
};