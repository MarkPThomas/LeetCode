// 2024/09/15
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: xx min - overtime, then referred to solution
// Patterns: Merge Sort
// Notes w.r.t. solution:
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function (buildings) {
  function getSkylineFromRange(left, right) {
    if (left === right) {
      return [
        [buildings[left][0], buildings[left][2]],
        [buildings[left][1], 0]
      ]
    }

    const mid = left + Math.floor((right - left) / 2);
    const leftSkyline = getSkylineFromRange(left, mid);
    const rightSkyline = getSkylineFromRange(mid + 1, right);

    return mergeSkylines(leftSkyline, rightSkyline);
  }

  function mergeSkylines(leftSky, rightSky) {
    const results = [];

    let leftIdx = 0;
    let rightIdx = 0;
    let leftHeightPrev = 0;
    let rightHeightPrev = 0;
    while (leftIdx < leftSky.length && rightIdx < rightSky.length) {
      const [leftX, leftHeight] = leftSky[leftIdx];
      const [rightX, rightHeight] = rightSky[rightIdx];

      let height = -1;
      let x = -1;
      if (leftX === rightX) {
        x = leftX;
        height = Math.max(leftHeight, rightHeight);
        leftHeightPrev = leftHeight;
        rightHeightPrev = rightHeight;
        leftIdx++;
        rightIdx++;
      } else if (leftX < rightX) {
        x = leftX;
        height = Math.max(leftHeight, rightHeightPrev);
        leftHeightPrev = leftHeight;
        leftIdx++;
      } else {
        x = rightX;
        height = Math.max(leftHeightPrev, rightHeight);
        rightHeightPrev = rightHeight;
        rightIdx++;
      }

      if (!results.length || results[results.length - 1][1] !== height) {
        results.push([x, height]);
      }
    }

    // Fill remaining
    while (leftIdx < leftSky.length) {
      const [x, height] = leftSky[leftIdx];
      results.push([x, height]);
      leftIdx++;
    }

    while (rightIdx < rightSky.length) {
      const [x, height] = rightSky[rightIdx];
      results.push([x, height]);
      rightIdx++;
    }

    return results;
  }

  return getSkylineFromRange(0, buildings.length - 1);
};