// 2025/01/25
// O(n!) time complexity
// O(n^2) space complexity
// Time to complete: 20:14 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const solutions = [];

  const board = Array(n).fill().map(() => Array(n).fill('.'));
  const cols = {};
  const diags = {};
  const diagsAnti = {};

  function isValid(row, col) {
    return !cols[col] && !diags[row + col] && !diagsAnti[row - col];
  }

  function mark(row, col, val) {
    cols[col] = val;
    diags[row + col] = val;
    diagsAnti[row - col] = val;

    if (val) {
      board[row][col] = 'Q';
    } else {
      board[row][col] = '.';
    }
  }

  function cloneBoard() {
    const validBoard = [];
    for (const row of board) {
      validBoard.push(row.join(''));
    }

    return validBoard;
  }

  function backtrack(row) {
    // If after last row, save result & break
    if (row === n) {
      solutions.push(cloneBoard());
      return;
    }

    // Try each col
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {   // If valid square
        mark(row, col, true);  // try placement
        backtrack(row + 1);    // continue to next row
        mark(row, col, false); // then remove placement
      }
    }
  }

  backtrack(0, 0);

  return solutions;
};