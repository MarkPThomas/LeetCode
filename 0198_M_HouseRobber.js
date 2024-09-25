// 2024/09/24
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:17 min
// Patterns: DP w/ Tabulation/iteration
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const maxRobbed = [];
  maxRobbed[0] = nums[0];
  maxRobbed[1] = Math.max(maxRobbed[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    maxRobbed[i] = Math.max(maxRobbed[i - 1], maxRobbed[i - 2] + nums[i]);
  }

  return maxRobbed[nums.length - 1];
};