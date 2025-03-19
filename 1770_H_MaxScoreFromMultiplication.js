// 2025/03/19
// O(n * m) = O(m^2) time complexity
// O(n * m) = O(m^2) space complexity
// Time to complete: 19:55 min
// Patterns: Dynamic Programming - Multi-D
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number[]} multipliers
 * @return {number}
 */
var maximumScore = function (nums, multipliers) {
  // State:
  // m operations (multipliers)
  // numsLeft
  // numsRight

  const memo = Array(multipliers.length).fill().map(() => Array(nums.length));

  function dp(numOps, iLeft) {
    const iRight = iLeft + nums.length - 1 - numOps;

    if (numOps === multipliers.length || iLeft > iRight) {
      return 0;
    }

    if (memo[numOps][iLeft] !== undefined) {
      return memo[numOps][iLeft];
    }

    // Choose x from start || end of nums
    // "Remove" x from nums by incrementing pointer or numOps
    // Max score
    const maxScore = Math.max(
      // Use Left num
      multipliers[numOps] * nums[iLeft] + dp(numOps + 1, iLeft + 1),
      // Use Right num
      multipliers[numOps] * nums[iRight] + dp(numOps + 1, iLeft)
    );

    memo[numOps][iLeft] = maxScore;
    return memo[numOps][iLeft];
  }

  return dp(0, 0, 0);
};