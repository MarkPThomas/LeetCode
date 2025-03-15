// 2025/03/15
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = length string 1, n = length string 2
// Time to complete: 32:08 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Would have solved much faster if I had remembered to Memoize to avoid TLE :-P
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  const freqs = {};
  for (const char of s3) {
    freqs[char] ??= 0;
    freqs[char]++;
  }

  if (!isValid(s1) || !isValid(s2)) {
    return false;
  }

  const memo = Array(s1.length + 1).fill().map(() => Array(s2.length + 1));

  return dp(0, 0);

  function isValid(str) {
    for (const char of str) {
      if (!(char in freqs)) {
        return false;
      }

      freqs[char]--;

      if (freqs[char] < 0) {
        return false;
      }
    }
    return true;
  }

  // For each char pair, we have 2 choices:
  // 1. Choose char1 & increment forward on str1
  // 2. Choose char2 & increment forward on str2
  // Each increment also increments on str3
  // chars can only be chosen if they match curr char of str3

  // States:
  // 1. Position on str1
  // 2. Position on str2 (position on str3 = 1 + 2)

  // Base Cases:
  // 1. If neither char1 or char2 match char3, we cannot interleave
  // 2. If i1 + i2 = str3.length, we are done

  function dp(i1, i2) {
    const i3 = i1 + i2;
    // Base cases
    if (i3 === s3.length) {
      return true;
    } else if (s1[i1] !== s3[i3] && s2[i2] !== s3[i3]) {
      return false;
    }

    if (memo[i1][i2] !== undefined) {
      return memo[i1][i2];
    }

    memo[i1][i2] = (
      (i1 < s1.length && s1[i1] === s3[i3] && dp(i1 + 1, i2))
      || (i2 < s2.length && s2[i2] === s3[i3] && dp(i1, i2 + 1))
    );

    return memo[i1][i2];
  }

};

// ===== Worked Solutions =====
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = length string 1, n = length string 2
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Top-Down
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  const freqs = {};
  for (const char of s3) {
    freqs[char] ??= 0;
    freqs[char]++;
  }

  if (!isValid(s1) || !isValid(s2)) {
    return false;
  }

  const memo = Array(s1.length + 1).fill().map(() => Array(s2.length + 1));

  return dp(0, 0);

  function isValid(str) {
    for (const char of str) {
      if (!(char in freqs)) {
        return false;
      }

      freqs[char]--;

      if (freqs[char] < 0) {
        return false;
      }
    }
    return true;
  }

  function dp(i1, i2) {
    const i3 = i1 + i2;
    if (i3 === s3.length) {
      return true;
    } else if (s1[i1] !== s3[i3] && s2[i2] !== s3[i3]) {
      return false;
    }

    if (memo[i1][i2] !== undefined) {
      return memo[i1][i2];
    }

    memo[i1][i2] = (
      (i1 < s1.length && s1[i1] === s3[i3] && dp(i1 + 1, i2))
      || (i2 < s2.length && s2[i2] === s3[i3] && dp(i1, i2 + 1))
    );

    return memo[i1][i2];
  }

};

// O(m * n) time complexity
// O(m * n) space complexity
//  where m = length string 1, n = length string 2
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {

  function isValid(str) {
    for (const char of str) {
      if (!(char in freqs)) {
        return false;
      }

      freqs[char]--;

      if (freqs[char] < 0) {
        return false;
      }
    }
    return true;
  }

  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  const freqs = {};
  for (const char of s3) {
    freqs[char] ??= 0;
    freqs[char]++;
  }

  if (!isValid(s1) || !isValid(s2)) {
    return false;
  }

  const dp = Array(s1.length + 1).fill().map(() => Array(s2.length + 1).fill(false));
  dp[0][0] = true;

  for (let i1 = 0; i1 <= s1.length; i1++) {
    for (let i2 = 0; i2 <= s2.length; i2++) {
      const i3 = i1 + i2;
      if ((i1 === 0 && i2 === 0)
        || (s1[i1] !== s3[i3] && s2[i2] !== s3[i3])) {
        continue;
      }

      dp[i1][i2] = (
        (i1 > 0 && s1[i1 - 1] === s3[i3 - 1] && dp[i1 - 1][i2])
        || (i2 > 0 && s2[i2 - 1] === s3[i3 - 1] && dp[i1][i2 - 1])
      );
    }
  }

  return dp[s1.length][s2.length];
};

// O(m * n) time complexity
// O(m + n) space complexity
//  where m = length string 1, n = length string 2
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up w/ State Reduction
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {

  function isValid(str) {
    for (const char of str) {
      if (!(char in freqs)) {
        return false;
      }

      freqs[char]--;

      if (freqs[char] < 0) {
        return false;
      }
    }
    return true;
  }

  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  const freqs = {};
  for (const char of s3) {
    freqs[char] ??= 0;
    freqs[char]++;
  }

  if (!isValid(s1) || !isValid(s2)) {
    return false;
  }

  const dp = Array(s2.length + 1).fill(false);
  dp[0] = true;

  for (let i1 = 0; i1 <= s1.length; i1++) {
    for (let i2 = 0; i2 <= s2.length; i2++) {
      const i3 = i1 + i2;
      if ((i1 === 0 && i2 === 0)
        || (s1[i1] !== s3[i3] && s2[i2] !== s3[i3])) {
        continue;
      }

      dp[i2] = (
        (i1 > 0 && s1[i1 - 1] === s3[i3 - 1] && dp[i2])
        || (i2 > 0 && s2[i2 - 1] === s3[i3 - 1] && dp[i2 - 1])
      );
    }
  }

  return dp[s2.length];
};