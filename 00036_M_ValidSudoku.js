// 2024/10/17
// O(1) time complexity
// O(1) space complexity
// Time to complete: 20:21 min
// Patterns: Hashmap
// Notes w.r.t. solution: First 7:18 was derp, then super derp to 15 min.

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const usedByRow = {};
  const usedByCol = {};
  const usedByQuadrant = {};

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val === '.') {
        continue;
      }

      const quadRow = Math.floor(row / 3);
      const quadCol = Math.floor(col / 3);
      const quadCoord = [quadRow, quadCol];

      if (!usedByRow[val]) {
        usedByRow[val] = {};
      }

      if (!usedByCol[val]) {
        usedByCol[val] = {};
      }

      if (!usedByQuadrant[val]) {
        usedByQuadrant[val] = {};
      }

      if (usedByRow[val][row]
        || usedByCol[val][col]
        || usedByQuadrant[val][quadCoord]) {
        return false;
      }

      usedByRow[val][row] = true;
      usedByCol[val][col] = true;
      usedByQuadrant[val][quadCoord] = true;
    }
  }

  return true;
};