// 2025/03/03
// O(n^2) time complexity
// O(n^2) space complexity
// Time to complete: 9:15 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let numPals = 0;

  const dp = Array(s.length).fill().map(() => Array(s.length).fill(false));
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
    numPals++;
    if (i < s.length - 1 && s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      numPals++;
    }
  }

  for (let diff = 2; diff < s.length; diff++) {
    for (let left = 0; left < s.length - diff; left++) {
      const right = left + diff;
      if (s[left] === s[right] && dp[left + 1][right - 1]) {
        dp[left][right] = true;
        numPals++;
      }
    }
  }

  return numPals;
};

// 2025/03/03
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 8:15 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  function countPalindromes(left, right, s) {
    let numPals = 0;

    while (0 <= left && right < s.length && s[left] === s[right]) {
      numPals++;
      left--;
      right++;
    }

    return numPals;
  }

  let numPals = 0;

  for (let i = 0; i < s.length; i++) {
    // Check odd #
    numPals += countPalindromes(i, i, s);

    // Check even #
    numPals += countPalindromes(i, i + 1, s);
  }

  return numPals;
};