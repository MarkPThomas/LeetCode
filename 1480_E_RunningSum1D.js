// O(n) time complexity
// O(1) space complexity
// Time to complete: 1:13 min
// Patterns: Prefix Sum
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = nums[i] + nums[i - 1];
  }

  return nums;
};