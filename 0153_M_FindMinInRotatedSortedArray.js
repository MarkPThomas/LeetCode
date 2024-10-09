// 2024/10/09
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 23:04 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  if (nums[left] < nums[right]) {
    return nums[left];
  }

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid - 1] > nums[mid]) {
      left = mid;
      break;
    } else if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return nums[left];
};