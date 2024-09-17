// 2024/09/17
// O(n) time complexity
// O(1) space complexity
// Time to complete: 16:56 min
// Patterns: 2 pointers
// Notes w.r.t. solution: Would have been 6 min, but made a number of minor mistakes. Slow down!
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxArea = 0;

  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    const width = Math.max(right - left, 1);

    // height is shortest of 2 heights
    // for max area, try moving shortest height to find a higher height
    let minHeight = 0;
    if (height[left] <= height[right]) {
      minHeight = height[left];
      left++;
    } else {
      minHeight = height[right];
      right--;
    }
    maxArea = Math.max(maxArea, width * minHeight);
  }

  return maxArea;
};

// 2023/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: 13 min
// Patterns: 2 pointers
// Notes w.r.t. solution: Would have been a bit faster but had minor error (compared indices rather than heights by accident for cursor increments)

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxArea = 0;
  let leftPtr = 0;
  let rightPtr = height.length - 1;
  while (leftPtr < rightPtr) {
    const base = rightPtr - leftPtr;
    const minHeight = Math.min(height[leftPtr], height[rightPtr]);
    maxArea = Math.max(maxArea, base * minHeight);
    if (height[leftPtr] < height[rightPtr]) {
      leftPtr++;
    } else {
      rightPtr--;
    }
  }
  return maxArea;
};