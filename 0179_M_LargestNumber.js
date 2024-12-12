// 2024/12/12
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 20:00 min
// Patterns: Greedy
// Notes w.r.t. solution: Should have thought through the comparator more carefully.
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i].toString();
  }
  nums.sort((a, b) => (b + a) - (a + b));

  return nums[0] === '0' ? '0' : nums.join('');
};