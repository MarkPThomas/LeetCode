// O(n) time complexity
// O(1) space complexity
// Time to complete: 3 min
// Patterns: Sliding window
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let lengthIncrease = 1;
  let maxLengthIncrease = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      lengthIncrease++;
    } else {
      maxLengthIncrease = Math.max(maxLengthIncrease, lengthIncrease);
      lengthIncrease = 1;
    }
  }

  return Math.max(maxLengthIncrease, lengthIncrease);
};