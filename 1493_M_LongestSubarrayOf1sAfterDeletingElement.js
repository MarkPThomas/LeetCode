// 2025/02/03
// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:06 min
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let maxCount = 0;
  let zerosCount = 0;

  let left = -1;
  let k = 1;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zerosCount++;

      if (zerosCount > k) {
        maxCount = Math.max(maxCount, right - 1 - left - k);
      }

      while (left <= right && zerosCount > k) {
        left++;
        if (nums[left] === 0) {
          zerosCount--;
        }
      }
    }
  }

  return Math.max(maxCount, nums.length - 1 - left - k);
};