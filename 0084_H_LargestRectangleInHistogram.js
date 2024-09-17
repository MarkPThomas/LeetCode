// 2024/09/16
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 47:56 min
// Patterns: Recursion w/ hashmap optimization
// Notes w.r.t. solution: Solved in 20:15 w/ timeout.
//    Optimization w/ debugging took another 27 min!
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let maxArea = 0;

  const heightsMerged = {};
  let prevHeight = -1;
  let prevIdx = -1;
  heights.forEach((height, idx) => {
    if (prevHeight !== height) {
      heightsMerged[idx] = [height, 1];

      prevHeight = height;
      prevIdx = idx;
    } else {
      heightsMerged[prevIdx][1]++;
    }
  });

  const mergedIdxs = Object.keys(heightsMerged);

  function getAreas(idx) {
    const mergedIdx = mergedIdxs[idx];
    if (mergedIdx >= heights.length || mergedIdx === undefined) {
      return;
    }

    const [height, widthInitial] = heightsMerged[mergedIdx];
    let width = widthInitial;
    // Look left
    for (i = idx - 1; 0 <= i; i--) {
      const leftMergedIdx = mergedIdxs[i];
      if (heightsMerged[leftMergedIdx][0] >= height) {
        width += heightsMerged[leftMergedIdx][1];
      } else {
        break;
      }
    }

    // Look right
    for (i = idx + 1; i < mergedIdxs.length; i++) {
      const rightMergedIdx = mergedIdxs[i];
      if (heightsMerged[rightMergedIdx][0] >= height) {
        width += heightsMerged[rightMergedIdx][1];
      } else {
        break;
      }
    }

    maxArea = Math.max(maxArea, height * width);

    getAreas(idx + 1);
  }

  getAreas(0);
  return maxArea;
};