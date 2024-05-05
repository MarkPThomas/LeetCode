// 2024/05/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 13:50 min
// Patterns: Cyclic Sort
// Notes w.r.t. solution: Review cyclic sort. Was basically there early on.

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // cyclic sort
  let i = 0;
  while (i < nums.length) {
    targetIdx = nums[i];
    if (nums[i] !== nums[targetIdx]) {
      [nums[i], nums[targetIdx]] = [nums[targetIdx], nums[i]];
    } else {
      i++;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }

  return nums.length;
};