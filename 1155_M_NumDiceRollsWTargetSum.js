// 2025/03/18
// O(n * t * k) time complexity
// O(n * t) space complexity
//  where n = # dice, t = target, k = # faces of each dice
// Time to complete: 25:32 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  if (target > n * k) {
    return 0;
  } else if (n === 1) {
    return 1;
  }

  const memo = Array(n + 1).fill().map(() => Array(target + 1));

  function dp(n, remainder) {
    // Base case
    if (n === 1) {
      // For 1 dice, there is one way if any face can = target
      return remainder <= k ? 1 : 0;
    }

    if (memo[n][remainder] !== undefined) {
      return memo[n][remainder];
    }

    // For a given dice, try each face & then remaining dice
    // A given value is only valid if all other dice roll a 1
    // i.e. remainder >= n - 1
    let ways = 0;
    for (let i = 1; i <= k && remainder - i >= n - 1; i++) {
      ways += dp(n - 1, remainder - i);
    }

    memo[n][remainder] = ways % (10 ** 9 + 7);
    return memo[n][remainder];
  }

  return dp(n, target) ?? 0;
};

// ===== Solutions =====
// O(n * t * k) time complexity
// O(n * t) space complexity
//  where n = # dice, t = target, k = # faces of each dice
// Patterns: Dynamic Programming - Top-Down
/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  if (target > n * k) {
    return 0;
  } else if (n === 1) {
    return 1;
  }

  const memo = Array(n + 1).fill().map(() => Array(target + 1));

  function dp(n, remainder) {
    // Base case
    if (n === 1) {
      // For 1 dice, there is one way if any face can = target
      return remainder <= k ? 1 : 0;
    }

    if (memo[n][remainder] !== undefined) {
      return memo[n][remainder];
    }

    // For a given dice, try each face & then remaining dice
    // A given value is only valid if all other dice roll a 1
    // i.e. remainder >= n - 1
    let ways = 0;
    for (let i = 1; i <= k && remainder - i >= n - 1; i++) {
      ways += dp(n - 1, remainder - i);
    }

    memo[n][remainder] = ways % (10 ** 9 + 7);
    return memo[n][remainder];
  }

  return dp(n, target) ?? 0;
};


// O(n * t * k) time complexity
// O(n * t) space complexity
//  where n = # dice, t = target, k = # faces of each dice
// Patterns: Dynamic Programming - Top-Down
/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
  if (target > n * k) {
    return 0;
  } else if (n === 1) {
    return 1;
  }

  const dp = Array(n + 1).fill().map(() => Array(target + 1).fill(0));
  dp[n][target] = 1;

  for (let nIdx = n - 1; nIdx >= 0; nIdx--) {
    for (let currSum = 0; currSum <= target; currSum++) {
      let ways = 0;
      for (let val = 1; val <= Math.min(k, target - currSum); val++) {
        ways = (ways + dp[nIdx + 1][currSum + val]);
      }

      dp[nIdx][currSum] = ways % (10 ** 9 + 7);
    }
  }

  return dp[0][0];
};