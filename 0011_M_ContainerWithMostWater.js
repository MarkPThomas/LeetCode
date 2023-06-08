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