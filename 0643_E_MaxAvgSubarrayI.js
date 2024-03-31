// 2024/03/31
// O(n) time complexity
// O(1) space complexity
// Time to complete: 11:28 min
// Patterns: Sliding window
// Notes w.r.t. solution: Solved in 5:00 min, but had 2 minor issues that cost debugging time. Slow down! Think a bit more carefully.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage20240331 = function (nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum / k;
};

// 2023/06
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
var findMaxAverage2023 = function (nums, k) {
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