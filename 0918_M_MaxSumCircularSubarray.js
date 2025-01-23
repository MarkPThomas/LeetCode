// 2024/12/18
// O(n) time complexity
// O(1) space complexity
// Time to complete: OT/NA min
// Patterns: Dynamic Programming, Kadane's Alg
// Notes w.r.t. solution: Worked solution after failed attempt.
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  let maxSum = nums[0];
  let minSum = nums[0];
  let totalSum = 0;

  let currMax = 0;
  let currMin = 0;
  for (const num of nums) {
    currMax = Math.max(currMax, 0) + num;
    maxSum = Math.max(maxSum, currMax);

    currMin = Math.min(currMin, 0) + num;
    minSum = Math.min(minSum, currMin);

    totalSum += num;
  }

  // First return occurs if all #s are negative
  return (totalSum === minSum) ? maxSum : Math.max(maxSum, totalSum - minSum);
};