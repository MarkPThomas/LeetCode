// 2024/04/11
// O(n) time complexity
// O(1) space complexity
// Time to complete: 21:28 min
// Patterns: Interval
// Notes w.r.t. solution: Would have been much under 20 min except some unclarified edge cases threw me off.
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number[][]}
 */
var findMissingRanges = function (nums, lower, upper) {
  if (!nums.length) {
    return [[lower, upper]];
  }

  let missingRanges = [];

  if (lower < nums[0]) {
    missingRanges.push([lower, nums[0] - 1]);
  }

  for (let i = 1; i < nums.length; i++) {
    let start = nums[i - 1];
    let end = nums[i];

    if (end - start < 2) {
      continue;
    }

    missingRanges.push([start + 1, end - 1]);
  }

  if (nums[nums.length - 1] < upper) {
    missingRanges.push([nums[nums.length - 1] + 1, upper]);
  }

  return missingRanges;
};


// 2023/06
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
var findMissingRanges2023 = function (nums, lower, upper) {
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