// 2025/07/06
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 22:53 min
// Patterns: Dynamic Programming - Iterative
// Notes w.r.t. solution: Top-down
/**
 * @param {number} n
 * @return {number}
 */
var maxA = function (n) {
  // Print A => n - 1, +1
  // Ctrl-A + Ctrl-C + (Ctrl-V * m) => n - 2 - m, +currLength * m

  const memo = {};

  // Choices:
  // Print A
  // Ctrl-A + Ctrl-C + m * Ctrl-V, where m = 1:n - 2
  function dp(n) { // return max # As added
    if (n < 4) {
      return n; // Single pushes of 'A' are our only option
    }

    if (n in memo) {
      return memo[n];
    }

    // try single press of 'A'
    const add = dp(n - 1) + 1;

    // try copy-paste 1:n - 2 # times
    let maxCopyPaste = 0;
    for (let i = 1; i < n - 2; i++) {
      const copyPaste = (i + 1) * dp(n - (2 + i));
      maxCopyPaste = Math.max(maxCopyPaste, copyPaste);
    }

    memo[n] = Math.max(add, maxCopyPaste);
    return memo[n];
  }

  return dp(n);
};

// ==== Solution ====
// O(n) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming - Iterative
// Notes w.r.t. solution: Top-down
/**
 * @param {number} n
 * @return {number}
 */
var maxA = function (n) {
  const memo = {};

  function dp(n) {
    if (n < 4) {
      return n; // Single pushes of 'A' are our only option
    }

    if (n in memo) {
      return memo[n];
    }

    // try single press of 'A'
    const add = dp(n - 1) + 1;

    // try copy-paste 1:n - 2 # times -> max 4 times, else = to single presses (optimization reduces time complexity)
    let maxCopyPaste = 0;
    for (let i = 1; i < Math.min(5, n - 2); i++) {
      const copyPaste = (i + 1) * dp(n - (2 + i));
      maxCopyPaste = Math.max(maxCopyPaste, copyPaste);
    }

    memo[n] = Math.max(add, maxCopyPaste);
    return memo[n];
  }

  return dp(n);
};

// O(n) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming - Iterative
// Notes w.r.t. solution: Bottom-Up
/**
 * @param {number} n
 * @return {number}
 */
var maxA = function (n) {
  const dp = [];
  // Fill in base case of pressing 'A'
  for (let i = 0; i <= n; i++) {
    dp[i] = i;
  }

  // Ignoring n < 4 - final 3 steps are always better to select+copy+paste
  for (let i = 0; i <= n - 3; i++) {
    // i + 3 for the 3 actions of select+copy+paste
    // Optimization:
    //  Only paste at most 4 times, else better to do new select+copy+paste
    for (let j = i + 3; j <= Math.min(n, i + 6); j++) {
      // j - i - 1 = # times select+copy+paste + initial state @ i
      // j - i - 3 w/ j_o = i + 3 =>
      //  i + 3 - i - 1
      //      = 2 * l             @ first paste
      //      & (1 + #paste) * l  @ multiple pastes
      dp[j] = Math.max(dp[j], (j - i - 1) * dp[i]);
    }
  }

  return dp[n];
};