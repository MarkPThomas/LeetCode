// 2025/04/22
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4:41 min
// Patterns: Stack (Monotonic)
// Notes w.r.t. solution:
/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
  // rightmost always has a view
  let hasView = [];

  // each moving left must be taller than all to the right
  let maxHeight = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    if (heights[i] > maxHeight) {
      hasView.push(i);
      maxHeight = heights[i];
    }
  }

  return hasView.reverse();
};