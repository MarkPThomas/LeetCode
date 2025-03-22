// 2025/03/21
// O(n^2) time complexity
// O(n^2) space complexity
// Time to complete: 34:34 min
// Patterns: Dynamic Programming - Longest Palindromic Subsequence - Top-down
// Notes w.r.t. solution: After hint from Editorial
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const memo = Array(s.length).fill().map(() => Array(s.length));

  return dp(0, s.length - 1);

  function dp(left, right) {
    if (left > right) {
      return 0;
    } else if (left === right) {
      return 1;
    }

    if (memo[left][right] !== undefined) {
      return memo[left][right];
    }

    // Check chars from the outside, working in
    if (s[left] === s[right]) {
      memo[left][right] = dp(left + 1, right - 1) + 2;
    } else {
      memo[left][right] = Math.max(dp(left + 1, right), dp(left, right - 1));
    }

    return memo[left][right];
  }
};

// 2025/03/21
// O() time complexity
// O(1) space complexity
// Time to complete: OT (31:00) min - Failed to get any passing
// Patterns: Dynamic Programming - Longest Palindromic Subsequence - Top-down
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {

  function getLongestPalSubseq(i) {
    const memo = Array(s.length).fill().map(() => Array(s.length));

    function dp(left, diff) {
      const right = left + diff;
      if (left < 0 || s.length <= right) {
        return 0;
      }

      if (memo[left][diff] !== undefined) {
        return memo[left][diff];
      }

      if (s[left] === s[right]) {
        memo[left][diff] = dp(left - 1, diff + 2) + 1;
      } else {
        // Get right match
        let offsetL = 0;
        while (0 <= left - offsetL && s[left - offsetL] !== s[right]) {
          offsetL--;
        }
        const chooseL = (left - offsetL < 0 ? 0 : dp(left - offsetL, diff + offsetL));

        // Get left match
        let offsetR = 0;
        while (right + offsetR < s.length && s[left] !== s[right + offsetR]) {
          offsetR++;
        }
        const chooseR = (right + offsetR === s.length ? 0 : dp(left, diff + offsetR));

        memo[left][diff] = Math.max(chooseL, chooseR);
      }

      return memo[left][diff];
    }

    // Try odd & even # pal
    return Math.max(dp(i, 0), dp(i, 1));
  }

  let maxPalSubseq = 1;
  // Starting from each char
  //  Determine longest pal seq & store at char loc
  // Pals need not be contiguous
  for (let i = 0; i < s.length; i++) {
    const palSubseq = getLongestPalSubseq(i);
    maxPalSubseq = Math.max(maxPalSubseq, palSubseq);
  }

  return maxPalSubseq;
};

// ===== Solutions =====
// O(n^2) time complexity
// O(n^2) space complexity
// Patterns: Dynamic Programming - Longest Palindromic Subsequence - Top-down
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const memo = Array(s.length).fill().map(() => Array(s.length));

  return dp(0, s.length - 1);

  function dp(left, right) {
    if (left > right) {
      return 0;
    } else if (left === right) {
      return 1;
    }

    if (memo[left][right] !== undefined) {
      return memo[left][right];
    }

    // Check chars from the outside, working in
    if (s[left] === s[right]) {
      memo[left][right] = dp(left + 1, right - 1) + 2;
    } else {
      memo[left][right] = Math.max(dp(left + 1, right), dp(left, right - 1));
    }

    return memo[left][right];
  }
};

// O(n^2) time complexity
// O(n^2) space complexity
// Patterns: Dynamic Programming - Longest Palindromic Subsequence - Bottom-Up
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const dp = Array(s.length).fill().map(() => Array(s.length).fill(0));

  for (let left = s.length - 1; left >= 0; left--) {
    // Base case of single char
    dp[left][left] = 1;

    for (let right = left + 1; right < s.length; right++) {
      // Check chars from the outside, working in
      if (s[left] === s[right]) {
        dp[left][right] = dp[left + 1][right - 1] + 2;
      } else {
        dp[left][right] = Math.max(dp[left + 1][right], dp[left][right - 1]);
      }
    }
  }

  return dp[0][s.length - 1];
};

// O(n^2) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming - Longest Palindromic Subsequence - Bottom-Up w/ Space Reduction
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  let dp = Array(s.length).fill(0);
  let dpPrev = [...dp];

  for (let left = s.length - 1; left >= 0; left--) {
    // Base case of single char
    dp[left] = 1;

    for (let right = left + 1; right < s.length; right++) {
      // Check chars from the outside, working in
      if (s[left] === s[right]) {
        dp[right] = dpPrev[right - 1] + 2;
      } else {
        dp[right] = Math.max(dpPrev[right], dp[right - 1]);
      }
    }

    dpPrev = [...dp];
  }

  return dp[s.length - 1];
};