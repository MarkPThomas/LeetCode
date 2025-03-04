// 2025/03/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 15:19 min
// Patterns: Greedy
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  if (nums.length === 1) {
    return 0;
  }

  let numJumps = 0;
  let range = 0;
  let maxLastRange = range;
  for (let i = 0; i < nums.length - 1; i++) {
    maxLastRange = Math.max(maxLastRange, i + nums[i]);
    if (!maxLastRange) { // We cannot jump anymore
      return -1;
    }

    if (i === range) {
      numJumps++;
      range = maxLastRange;
      if (range >= nums.length) { // We are able to reach the end
        return numJumps;
      }
      maxLastRange = 0;
    }
  }

  return numJumps;
};

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