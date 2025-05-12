// 2025/05/12
// O(n) time complexity
// O(1) space complexity
// Time to complete: 14:01 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var applyOperations = function (nums) {
  // if i = j, i *= 2, j = 0
  // At end, shift 0s to end
  // Do we only do this once? Or do we iterate until no more changes are made?

  // Apply operations
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      nums[i + 1] = 0;
    }
  }

  // Sort 0s
  let idx0 = 0;
  for (let i = 0; i < nums.length; i++) {
    while (nums[idx0] !== 0 && idx0 < nums.length) {
      idx0++;
    }

    if (idx0 === nums.length) {
      break;
    }

    if (idx0 < i && nums[i] !== 0) {
      nums[idx0] = nums[i];
      nums[i] = 0;
    }
  }

  return nums;
};