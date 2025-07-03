// 2024/09/01
// O(n!) time complexity
// O(n^2 + n) -> O(n^2) space complexity
// Time to complete: 29:50 min
// Patterns: Backtracking, dynamic programming, recursion
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const board = new Array(n * n).fill(0);

  function getIdx(row, col) {
    return (row * n) + col;
  }

  function canPlacePiece(row, col) {
    let offset = 1;
    while (row - offset >= 0) {
      const currRow = row - offset;

      // no prior rows have this col
      const colIdx = getIdx(currRow, col);
      if (board[colIdx] === 1) {
        return false;
      }

      // no prior rows have +/- row offset piece (diagonals check)
      const minIdx = getIdx(currRow, 0);
      const leftDiagIdx = getIdx(currRow, col - offset);
      if (minIdx <= leftDiagIdx && board[leftDiagIdx] === 1) {
        return false;
      }

      const maxIdx = getIdx(currRow, n - 1);
      const rightDiagIdx = getIdx(currRow, col + offset);
      if (rightDiagIdx <= maxIdx && board[rightDiagIdx] === 1) {
        return false;
      }

      offset++;
    }

    return true;
  }

  function placePiece(row, col) {
    board[getIdx(row, col)] = 1;
  }

  function removePiece(row, col) {
    board[getIdx(row, col)] = 0;
  }

  function nQueensCount(n, row, count) {
    for (let col = 0; col < n; col++) {
      if (canPlacePiece(row, col)) {
        if (row === n - 1) {
          count++;
        } else {
          placePiece(row, col);
          count = nQueensCount(n, row + 1, count);
        }
      }
      removePiece(row, col);
    }

    return count;
  }

  return nQueensCount(n, 0, 0);
};