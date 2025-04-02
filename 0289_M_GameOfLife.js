// 2025/04/02
// O(m * n) time complexity
// O(1) space complexity
// Time to complete: 31:15 (21:29) min
// Patterns: Matrix
// Notes w.r.t. solution: Finished coding in 21:29 but had some dumb minor bugs to fix.
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  // neighbors in 8 directions
  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1], [1, 1], [1, -1], [-1, -1], [-1, 1]];
  const LIVE = 1;
  const KILL = true;
  const DEAD = 0;
  const BIRTH = false;

  function liveIsDead(row, col) {
    if (board[row][col] === DEAD) {
      return false;
    }

    // (1) live cell dies if < 2 or > 3 live neighbors
    const liveAdjCount = getLiveAdjCount(row, col);
    return (liveAdjCount < 2 || 3 < liveAdjCount);
  }

  function deadIsBorn(row, col) {
    if (board[row][col] === LIVE) {
      return false;
    }

    // (0) dead cell comes alive if 3 live neighbors
    const liveAdjCount = getLiveAdjCount(row, col);
    return (liveAdjCount === 3);
  }

  function getLiveAdjCount(row, col) {
    let liveAdjCount = 0;
    for (const [rowDelt, colDelt] of DIRS) {
      const rowAdj = row + rowDelt;
      const colAdj = col + colDelt;

      if (board[rowAdj] && (
        board[rowAdj][colAdj] === LIVE
        || board[rowAdj][colAdj] === KILL)
      ) {
        liveAdjCount++;
      }
    }

    return liveAdjCount;
  }

  // births/deaths occur simultaneously when board is initialized
  // for every board tile, get count of live neighbors
  //  do 2 passes:

  //      1. Check live cells to see if they die, add indicator if so (true)
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (liveIsDead(row, col)) {
        board[row][col] = KILL;
      }
    }
  }

  //      2. Check dead cells after to see if they regen, add indicator (false)
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (deadIsBorn(row, col)) {
        board[row][col] = BIRTH;
      }
    }
  }

  // revisit tiles after all processed & flip according to indicator
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] === KILL) {
        board[row][col] = 0;
      } else if (board[row][col] === BIRTH) {
        board[row][col] = 1;
      }
    }
  }
};