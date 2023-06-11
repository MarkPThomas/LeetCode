// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 15:00 min
// Patterns: Binary Search
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  if (nums.length === 1 || nums[0] > nums[1]) {
    // maximum at only element, left element
    return 0;
  } else if (nums[nums.length - 2] < nums[nums.length - 1]) {
    // maximum at right element
    return nums.length - 1;
  }

  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    let prev = nums[mid - 1];
    let current = nums[mid];
    let next = nums[mid + 1];
    if (prev < current && current > next) {
      // maximum
      return mid;
    } else if (prev > current && current < next || prev < next) {
      // minimum (check any direction) or + slope check right
      left = mid;
    } else {
      // - slope check left
      right = mid;
    }
  }
};