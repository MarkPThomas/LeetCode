// 2025/02/18
// O(n) time complexity
// O(1) space complexity
// Time to complete: 30:57 min
// Patterns: Greedy
// Notes w.r.t. solution: Spent first 10 min trying to solve non-intuitive way that I remembered.
// Would have been better off simulating w/ greedy in a more intuitive way.
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let farthest = 0;
  for (let i = 0; i <= farthest; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) {
      return true;
    } else if (farthest === i) {
      return false;
    }
  }

  return false;
};