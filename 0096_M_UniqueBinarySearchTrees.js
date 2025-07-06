// 2025/07/06
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 15:18 min
// Patterns: Dynamic Programming, Binary Search Tree
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const memo = {};

  function dp(n) {
    if (n < 3) {
      return Math.max(1, n);
    }

    if (n in memo) {
      return memo[n];
    }

    let numPos = 0;
    for (let root = 1; root <= n; root++) {
      const numNodesLeft = root - 1;
      const numPosLeft = dp(numNodesLeft);

      const numNodesRight = n - root;
      const numPosRight = dp(numNodesRight);

      numPos += numPosLeft * numPosRight;
    }
    memo[n] = numPos;

    return memo[n];
  }

  return dp(n);
};