// 2024/09/08
// O(1) time complexity
// O(1) space complexity
// Time to complete: 48:03 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const empty = '.';

  function isValidRow(num, row) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] == num) {
        return false;
      }
    }
    return true;
  }

  function isValidCol(num, col) {
    for (let row = 0; row < board.length; row++) {
      if (board[row][col] == num) {
        return false;
      }
    }
    return true;
  }

  function isValidRegion(num, row, col) {
    const lowRow = 0 - row % 3;
    const lowCol = 0 - col % 3;

    for (let colOffset = 0; colOffset < 3; colOffset++) {
      for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
        if (board[row + lowRow + rowOffset][col + lowCol + colOffset] == num) {
          return false;
        }
      }
    }
    return true;
  }

  function isValid(num, row, col) {
    return isValidRegion(num, row, col)
      && isValidCol(num, col)
      && isValidRow(num, row);
  }

  function isCompleteSudoku(row) {
    return row > 8;
  }

  function backtrack(row, col) {
    if (isCompleteSudoku(row)) {
      return true;
    }

    const nextRow = col < 9 ? row : row + 1;
    const nextCol = col < 9 ? col + 1 : 0;

    if (board[row][col] === empty) {
      for (let num = 1; num <= 9; num++) {
        if (isValid(num, row, col)) {
          board[row][col] = `${num}`;

          if (!backtrack(nextRow, nextCol)) {
            board[row][col] = empty;
          } else {
            return true;
          }
        }
      }


    } else {
      return backtrack(nextRow, nextCol);
    }
  }

  backtrack(0, 0);
};