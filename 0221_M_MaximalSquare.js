// 2024/10/01
// O(m*n) time complexity
// O(m*n) space complexity
// Time to complete: 16:50 min*
// Patterns: DP 2D, Top-down
// Notes w.r.t. solution: Spent 50:29 solving the wrong problem (didn't notice it was limited to a square :-P)
//  Solving time was after realizing this
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const dp = Array(matrix.length + 1).fill().map(() => Array(matrix[0].length + 1).fill(0));

  let maxSide = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const val = parseInt(matrix[row][col]);

      if (val) {
        const up = dp[row - 1] ? dp[row - 1][col] ?? 0 : 0;
        const left = dp[row][col - 1] ?? 0;
        const diag = dp[row - 1] ? dp[row - 1][col - 1] ?? 0 : 0;
        const side = Math.min(up, left, diag) + val;

        dp[row][col] = side;
        maxSide = Math.max(maxSide, side);
      }
    }
  }

  return maxSide * maxSide;
};