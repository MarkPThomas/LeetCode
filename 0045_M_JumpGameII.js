// 2025/02/18
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Greedy
// Notes w.r.t. solution: Refactored JumpGame for notes. Not timed or from scratch.
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let farthest = 0;
  let nextFarthest = 0;
  let jumps = -1;
  for (let i = 0; i <= farthest; i++) {
    nextFarthest = Math.max(nextFarthest, i + nums[i]);

    if (farthest === i) {
      jumps++;

      if (farthest >= nums.length - 1) {
        return jumps;
      }
      farthest = nextFarthest;
    }
  }

  return -1;
};