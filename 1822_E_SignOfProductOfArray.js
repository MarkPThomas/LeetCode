// 2024/08/31
// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:27 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function (nums) {
  let sign = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      return 0;
    }

    if (nums[i] < 0) {
      sign *= -1;
    }
  }

  return sign;
};