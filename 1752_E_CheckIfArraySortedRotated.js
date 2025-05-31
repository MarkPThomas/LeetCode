// 2025/05/30
// O(n) time complexity
// O(1) space complexity
// Time to complete: 15:47 min
// Patterns: Arrays
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function (nums) {
  // check if increasing, with at most one decrease step
  let minValIdx = -1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > nums[i]) {
      if (minValIdx === -1) {
        minValIdx = i;
      } else {
        return false;
      }
    }
  }

  if (minValIdx === -1) {
    minValIdx = 0;
  }

  let idx = minValIdx;
  for (let i = 0; i < nums.length - 1; i++) {
    let nextIdx = (idx + 1) % nums.length;
    if (nums[idx] > nums[nextIdx]) {
      return false;
    }

    idx = nextIdx;
  }

  return true;
};