// 2025/03/16
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 10:16 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
  // Pts lie on the same line if:
  //  1. Share same slope
  //  2. Slope intercepts point
  // => share same slope calculated between the 2 pts

  let maxPts = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];

    const ptSlopeFreqs = {};
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];
      const slope = (x2 - x1) ? (y2 - y1) / (x2 - x1) : Infinity;

      ptSlopeFreqs[slope] ??= 0;
      ptSlopeFreqs[slope]++;
    }

    for (const ptsCount of Object.values(ptSlopeFreqs)) {
      maxPts = Math.max(maxPts, ptsCount);
    }
  }

  return maxPts + 1;
};