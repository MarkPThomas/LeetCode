// 2024/09/30
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 12:54 min
// Patterns: Binary Search
// Notes w.r.t. solution: Would have been solved in 7:30, but had minor errors in code. Doh!
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // Find start
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (nums[left] !== target) {
    return [-1, -1];
  }
  const start = left;

  // Find end
  right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return [start, right];
  // return [start, Math.max(start, left - 1)];
};