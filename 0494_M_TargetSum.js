// 2015/03/11
// O(n * totalSum) time complexity
// O(totalSum) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - 0/1 Knapsack
// Notes w.r.t. solution: Worked out solution w/ Bottom-Up w/ State Reduction
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  const totalSum = nums.reduce((acc, curr) => acc + curr);
  if (Math.abs(target) > totalSum) {
    return 0;
  }

  let dp = Array(2 * totalSum + 1).fill(0);
  dp[totalSum + nums[0]] = 1;
  dp[totalSum - nums[0]] += 1;

  for (let i = 1; i < nums.length; i++) {
    const dpNext = Array(2 * totalSum + 1).fill(0);
    for (let sum = -totalSum; sum <= totalSum; sum++) {
      if (dp[sum + totalSum] > 0) {
        dpNext[sum + totalSum + nums[i]] += dp[sum + totalSum];
        dpNext[sum + totalSum - nums[i]] += dp[sum + totalSum];
      }
    }
    dp = dpNext;
  }

  return dp[target + totalSum];
};


// 2015/01/10
// O(n * totalSum) time complexity
// O(n * totalSum) space complexity
// Time to complete: NA min
// Patterns: Dynamic Programming - 0/1 Knapsack
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
// Patterns: Dynamic Programming - 0/1 Knapsack
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