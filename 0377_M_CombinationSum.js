// 2025/03/01
// O(t * n) time complexity
// O(t) space complexity
//  where t = target, n = # nums
// Time to complete: OT/NA min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Worked Solution
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  nums.sort((a, b) => a - b)
  const counts = Array(target + 1).fill(0);
  counts[0] = 1;

  for (let sum = 1; sum <= target; sum++) {
    for (const num of nums) {
      if (sum >= num) {
        counts[sum] += counts[sum - num];
      } else {
        break;
      }
    }
  }

  return counts[target];
};

// 2025/03/01
// O(2 ^ n) time complexity
// O(t) space complexity
//  where t = target, n = # nums
// Time to complete: TLE 9/16 @ 4:13 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  let numWays = 0

  function backtrack(nums, target) {
    if (target === 0) {
      numWays++;
      return;
    } else if (target < 0) {
      return;
    }

    for (const num of nums) {
      backtrack(nums, target - num);
    }
  }

  backtrack(nums, target);

  return numWays;
};