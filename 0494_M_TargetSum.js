// 2015/01/10
// O(n * totalSum) time complexity
// O(n * totalSum) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - Count
// Notes w.r.t. solution: Worked out solution w/ memoization
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const totalSum = nums.reduce((acc, curr) => acc + curr);
  const memo = Array(nums.length).fill().map(() => Array(2 * totalSum + 1).fill(-Infinity));

  function dp(i, sum) {
    if (i === nums.length) {
      return sum === target ? 1 : 0;
    }

    if (memo[i][sum + totalSum] !== -Infinity) {
      return memo[i][sum + totalSum];
    }

    const waysPositive = dp(i + 1, sum + nums[i]);
    const waysNegative = dp(i + 1, sum - nums[i]);
    memo[i][sum + totalSum] = waysPositive + waysNegative;

    return memo[i][sum + totalSum];
  }

  return dp(0, 0);
};

// 2015/01/10
// O(2^n) time complexity
// O(n) space complexity
// Time to complete: 21:14 min
// Patterns: Dynamic Programming - Count
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  function dp(i, sum) {
    if (i === nums.length) {
      return sum === target ? 1 : 0;
    }

    const waysPositive = dp(i + 1, sum + nums[i])
    const waysNegative = nums[i] === 0
      ? waysPositive
      : dp(i + 1, sum - nums[i]);

    return waysPositive + waysNegative;
  }

  return dp(0, 0);
};