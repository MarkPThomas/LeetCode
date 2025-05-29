// 2025/05/29
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:50 min
// Patterns: Array
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function (nums) {
  // separate increasing/decreasing counts. Check max of each
  let maxIncrease = 1;
  let maxDecrease = 1;

  let currIncrease = 1;
  let currDecrease = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] < nums[i]) {
      currDecrease++;
      maxDecrease = Math.max(maxDecrease, currDecrease);

      currIncrease = 1;
    } else if (nums[i - 1] > nums[i]) {
      currIncrease++;
      maxIncrease = Math.max(maxIncrease, currIncrease);

      currDecrease = 1;
    } else { // Reset both
      currIncrease = 1;
      currDecrease = 1;
    }
  }


  return Math.max(maxIncrease, maxDecrease);
};