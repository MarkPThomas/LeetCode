// 2024/09/18
// O(n * 3^L) time complexity
// O(L) space complexity
// where n = # cells in board, L = word length
// Time to complete: 16:54 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]

  function backtrack(idx, row, col) {
    if (idx === word.length) {
      return true;
    }

    if (row < 0 || board.length <= row
      || col < 0 || board[0].length <= col
      || board[row][col] !== word[idx]) {
      return false;
    }

    board[row][col] = '_';

    for (const [rowOffset, colOffset] of directions) {
      if (backtrack(idx + 1, row + rowOffset, col + colOffset)) {
        return true;
      }
    }

    board[row][col] = word[idx];
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (backtrack(0, row, col)) {
        return true;
      }
    }
  }

  return false;
};