// 2024/05/17
// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:32 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function (nums) {
  if (nums.length < 3) {
    return true;
  }

  function getSlope(nums, i, j) {
    return nums[j] - nums[i] === 0
      ? 0
      : (nums[j] - nums[i]) > 0 ? 1 : -1;
  }

  let startSlope = null;
  for (let i = 1; i < nums.length; i++) {
    const currSlope = getSlope(nums, i - 1, i);
    if (currSlope && startSlope === null) {
      startSlope = currSlope;
    }

    if (currSlope && startSlope !== currSlope) {
      return false;
    }
  }

  return true;
};