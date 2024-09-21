// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 23:27 min
// Patterns: Binary Search
// Notes w.r.t. solution: Basically solved in 13:30.
//  Working out minor issues of < vs. <= took remaining time.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {

  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[left] <= nums[mid]) {
      // mid before shift
      if (nums[left] <= target && target < nums[mid]) {
        // val is in region
        right = mid - 1;
      } else {
        // val is in other region
        left = mid + 1;
      }
    } else {
      // mid after shift
      if (nums[mid] < target && target <= nums[right]) {
        // val is in region
        left = mid + 1;
      } else {
        // val is in other region
        right = mid - 1;
      }
    }
  }

  return -1;
};