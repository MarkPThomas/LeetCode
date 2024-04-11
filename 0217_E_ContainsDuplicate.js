// 2024/04/10
// O(n) time complexity
// O(n) space complexity
// Time to complete: 1:18 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const freq = {};

  for (let i = 0; i < nums.length; i++) {
    if (!freq[nums[i]]) {
      freq[nums[i]] = true;
    } else {
      return true;
    }
  }

  return false;
};

// 2023/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 1 min
// Patterns: Hash Map
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const numsSeen = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (numsSeen[num]) {
      return true;
    }
    numsSeen[num] = true;
  }
  return false;
};