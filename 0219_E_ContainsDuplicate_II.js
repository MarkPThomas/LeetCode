// 2024/04/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 12:10 min
// Patterns: Hash map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  // get all duplicate indices
  const duplicate = {};
  for (let i = 0; i < nums.length; i++) {
    if (!duplicate[nums[i]]) {
      duplicate[nums[i]] = [i]
    } else {
      duplicate[nums[i]].push(i);
    }
  }

  // compare to k
  for (key in duplicate) {
    const value = duplicate[key];
    if (1 < value.length) {
      for (let i = 1; i < value.length; i++) {
        if (Math.abs(value[i] - value[i - 1]) <= k) {
          return true;
        }
      }
    }
  }

  return false;
};


// 2023/06
// O(n) time complexity
// O(n) space complexity
// Time to complete: 14:00 min
// Patterns: Hash map
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]] === undefined) {
      map[nums[i]] = i;
    } else if (Math.abs(i - map[nums[i]]) <= k) {
      return true;
    } else {
      map[nums[i]] = i;
    }
  }

  return false;
};