// 2023/04
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

// 2024/02
// O(n) time complexity
// O(1) space complexity
// Time to complete: 10:28
// Patterns: Sliding window
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS20240229 = function (nums) {
  let l = 0;
  let r = l;
  let maxLength = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      r++;
    } else {
      if (r !== l) {
        maxLength = Math.max(maxLength, r - l + 1);
      }
      l = i;
      r = l;
    }
  }

  return Math.max(maxLength, r - l + 1);
};