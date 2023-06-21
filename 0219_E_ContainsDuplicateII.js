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