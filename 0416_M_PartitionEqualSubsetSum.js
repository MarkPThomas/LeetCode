// 2025/03/14
// O(n * m) time complexity
// O(n * m) space complexity
//  where n = # nums, m = subset sum
// Time to complete: OT/19:05 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-Down. Got to 4:29 TLE @ 124/144 but needed memo.
//  Had to work out from solution. Close!
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // Get initial sum
  const totalSum = nums.reduce((acc, val) => acc + val);
  // Sum must be even in order to have equal integer halfs
  if (totalSum % 2) {
    return false;
  }
  const subsetSum = totalSum / 2;

  const n = nums.length;
  const memo = Array(n + 1).fill().map(() => Array(subsetSum + 1));

  function dp(n, subsetSum) {
    // Base cases
    if (subsetSum === 0) {
      return true;
    } else if (subsetSum < 0 || n === 0) {
      // Must have at least 1 # & once sum > subset target, cannot ever = since nums +
      return false;
    }

    if (memo[n][subsetSum] !== undefined) {
      return memo[n][subsetSum];
    }

    const include = dp(n - 1, subsetSum - nums[n - 1]);
    const ignore = dp(n - 1, subsetSum);
    const result = include || ignore;

    memo[n][subsetSum] = result;
    return result;
  }

  return dp(n - 1, subsetSum);
};

// ====== Worked Solutions ======
// O(n * m) time complexity
// O(n * m) space complexity
//  where n = # nums, m = subset sum
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-Down
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // Get initial sum
  const totalSum = nums.reduce((acc, val) => acc + val);
  // Sum must be even in order to have equal integer halfs
  if (totalSum % 2) {
    return false;
  }
  const subsetSum = totalSum / 2;

  const n = nums.length;
  const memo = Array(n + 1).fill().map(() => Array(subsetSum + 1));

  function dp(n, subsetSum) {
    // Base cases
    if (subsetSum === 0) {
      return true;
    } else if (subsetSum < 0 || n === 0) {
      // Must have at least 1 # & once sum > subset target, cannot ever = since nums +
      return false;
    }

    if (memo[n][subsetSum] !== undefined) {
      return memo[n][subsetSum];
    }

    const include = dp(n - 1, subsetSum - nums[n - 1]);
    const ignore = dp(n - 1, subsetSum);
    const result = include || ignore;

    memo[n][subsetSum] = result;
    return result;
  }

  return dp(n - 1, subsetSum);
};

// O(n * m) time complexity
// O(n * m) space complexity
//  where n = # nums, m = subset sum
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up worked solution.
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // Get initial sum
  const totalSum = nums.reduce((acc, val) => acc + val);
  // Sum must be even in order to have equal integer halfs
  if (totalSum % 2) {
    return false;
  }
  const subsetSum = totalSum / 2;

  let dp = Array(nums.length + 1).fill().map(() => Array(subsetSum + 1).fill(false));
  dp[0][0] = true;

  for (let n = 1; n <= nums.length; n++) {
    const num = nums[n - 1];
    for (let currSubsetSum = 0; currSubsetSum <= subsetSum; currSubsetSum++) {
      if (currSubsetSum < num) {
        dp[n][currSubsetSum] = dp[n - 1][currSubsetSum];
      } else {
        dp[n][currSubsetSum] = dp[n - 1][currSubsetSum] || dp[n - 1][currSubsetSum - num];
      }
    }
  }

  return dp[nums.length][subsetSum];
};

// O(n * m) time complexity
// O(m) space complexity
//  where n = # nums, m = subset sum
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up worked solution w/ state reduction.
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // Get initial sum
  const totalSum = nums.reduce((acc, val) => acc + val);
  // Sum must be even in order to have equal integer halfs
  if (totalSum % 2) {
    return false;
  }
  const subsetSum = totalSum / 2;

  let dp = Array(subsetSum + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let currSubsetSum = subsetSum; currSubsetSum >= num; currSubsetSum--) {
      if (currSubsetSum < num) {
        dp[currSubsetSum] = dp[currSubsetSum];
      } else {
        dp[currSubsetSum] = (dp[currSubsetSum] || dp[currSubsetSum - num]);
      }
    }
  }

  return dp[subsetSum];
};

// O(n * m) time complexity
// O(m) space complexity
//  where n = # nums, m = subset sum
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up worked solution w/ state reduction & briefer code.
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  // Get initial sum
  const totalSum = nums.reduce((acc, val) => acc + val);
  // Sum must be even in order to have equal integer halfs
  if (totalSum % 2) {
    return false;
  }
  const subsetSum = totalSum / 2;

  let dp = Array(subsetSum + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let currSubsetSum = subsetSum; currSubsetSum >= num; currSubsetSum--) {
      dp[currSubsetSum] |= dp[currSubsetSum - num];
    }
  }

  return dp[subsetSum];
};