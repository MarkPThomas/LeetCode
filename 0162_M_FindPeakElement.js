// 2024/10/02
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 9:20 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    const prev = mid - 1 < 0 ? -Infinity : nums[mid - 1];
    const curr = nums[mid];
    const next = mid + 1 >= nums.length ? -Infinity : nums[mid + 1];

    if (prev < curr && curr > next) {
      return mid;
    } else if (prev < curr) { // Slope up & right, look right
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};


// 2023/08
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