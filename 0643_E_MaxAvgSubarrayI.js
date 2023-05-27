// O(n) time complexity
// O(1) space complexity
// Time to complete: 8 min
// Patterns: Sliding Window
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let sum = 0;
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    if (k <= i) {
      sum -= nums[i - k];
    }
    sum += nums[i];
    if (k - 1 <= i) {
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum / k;
};