// O(n) time complexity
// O(1) space complexity
// Time to complete: 20 min
// Patterns: Intervals
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number[][]}
 */
var findMissingRanges = function (nums, lower, upper) {
  if (nums.length === 0) {
    return [[lower, upper]];
  }

  const missingRanges = [];
  if (lower !== nums[0]) {
    missingRanges.push([lower, nums[0] - 1])
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      missingRanges.push([nums[i - 1] + 1, nums[i] - 1]);
      startRange = nums[i] + 1;
    }
  }

  if (upper !== nums[nums.length - 1]) {
    missingRanges.push([nums[nums.length - 1] + 1, upper]);
  }
  return missingRanges;
};