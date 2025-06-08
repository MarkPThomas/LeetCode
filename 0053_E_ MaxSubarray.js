// 2025/06/08
// O(n) time complexity
// O(1) space complexity
// Time to complete: 19:03 min
// Patterns: Kadane's Algorithm
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // Be greedy, take sum, but stop as soon as delta is negative
  // Never start a new set at a negative either
  let maxSumLast = -Infinity;
  let maxSum = -Infinity;

  for (const num of nums) {
    maxSumLast = Math.max(maxSumLast + num, num);
    maxSum = Math.max(maxSum, maxSumLast);
  }

  return maxSum;
};

// 2022/12
// O(n) time complexity
// O(1) space complexity
// Time to complete: 28 min
// Patterns: Dynamic programming
// Notes w.r.t. solution: Had to peek at the solution a bit. I was 90% there but would have gone down a rabbit hole.

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // Base case
  let maxSum = nums[0];
  let maxSumLast = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const value = nums[i];
    // Only keep sums that are positive. Otherwise, throw out old sum and start anew.
    maxSumLast = Math.max(value, maxSumLast + value);
    // Check if any increasing sum is a new max
    maxSum = Math.max(maxSum, maxSumLast);
  }

  return maxSum;
};