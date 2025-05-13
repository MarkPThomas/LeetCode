// 2025/05/13
// O(n) time complexity
// O(n) space complexity
// Time to complete: 5:11 min
// Patterns: Array
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const shuffle = [];
  for (let i = 0; i < n; i++) {
    shuffle.push(nums[i]);
    shuffle.push(nums[i + n]);
  }

  return shuffle;
};