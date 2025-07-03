// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:31 min
// Patterns: Sliding Window
// Notes w.r.t. solution: Fast time due to reviewing Probs I & II first. This is just a simple extension.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let maxCount = 0;
  let onesCount = 0;

  let left = -1;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      onesCount++;

      if (onesCount > k) {
        maxCount = Math.max(maxCount, right - 1 - left);
      }

      while (left <= right && onesCount > k) {
        left++;
        if (nums[left] === 0) {
          onesCount--;
        }
      }
    }
  }

  return Math.max(maxCount, nums.length - 1 - left);
};