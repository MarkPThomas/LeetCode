// 2024/05/22
// O(m) time complexity
// O(n) space complexity
// where n = board width/height, m = # moves
// Time to complete: N/A For reference
// Patterns: Simulation, Optimized solution
// Notes w.r.t. solution:
/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  const n = 3;
  const maxMoves = n * n;

  const cols = Array(n).fill(0);
  const rows = Array(n).fill(0);
  let diag = 0;
  let antiDiag = 0;

  let movesCount = 0;
  let player = 1;
  for (const move of moves) {
    const row = move[0];
    const col = move[1];

    rows[row] += player;
    cols[col] += player;

    if (row === col) {
      diag += player;
    }

    if (row === n - 1 - col) {
      antiDiag += player;
    }

    movesCount++;

    if (Math.abs(rows[row]) === n
      || Math.abs(cols[col]) === n
      || Math.abs(diag) === n
      || Math.abs(antiDiag) === n) {
      return player === 1 ? 'A' : 'B';
    } else if (movesCount >= maxMoves) {
      return 'Draw';
    }

    player *= -1;
  }

  return 'Pending';
};

// 2024/05/22
// O(n * m) time complexity
// O(n^2) space complexity
// where n = board width/height, m = # moves
// Time to complete: 18:52 min
// Patterns: Simulation, Brute force
// Notes w.r.t. solution:
/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  function isWinner(move, playerMark, board) {
    const row = move[0];
    const col = move[1];

    function verticalWins(row, playerMark, board) {
      for (let i = 0; i < board[0].length; i++) {
        if (board[row][i] !== playerMark) {
          return false;
        }
      }
      return true;
    }

    function horizontalWins(col, playerMark, board) {
      for (let i = 0; i < 3; i++) {
        if (board[i][col] !== playerMark) {
          return false;
        }
      }
      return true;
    }

    function diagonalWins(playerMark, board) {
      for (let i = 0; i < 3; i++) {
        if (board[i][i] !== playerMark) {
          return false;
        }
      }
      return true;
    }

    function antiDiagonalWins(playerMark, board) {
      for (let i = 0; i < 3; i++) {
        if (board[2 - i][i] !== playerMark) {
          return false;
        }
      }
      return true;
    }

    return (
      verticalWins(row, playerMark, board)
      || horizontalWins(col, playerMark, board)
      || diagonalWins(playerMark, board)
      || antiDiagonalWins(playerMark, board)
    );
  }

  const n = 3;
  const board = Array(n).fill(0).map(() => Array(n));
  const maxMoves = board.length * board[0].length;

  let movesCount = 0;
  for (let i = 0; i < moves.length; i++) {
    const piece = (i % 2) ? 'O' : 'X';
    const move = moves[i];
    board[move[0]][move[1]] = piece;
    movesCount++;

    if (isWinner(move, piece, board)) {
      return piece === 'X' ? 'A' : 'B';
    } else if (movesCount >= maxMoves) {
      return 'Draw';
    }
  }

  return 'Pending';
};