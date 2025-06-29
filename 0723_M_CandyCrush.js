// 2025/06/28
// O(m^2 * n^2) time complexity
// O(m * n) space complexity
// Time to complete: 38:26 min - OT debugging
// Patterns: Hashmap, 2 Pointer, Matrix, Simulation
// Notes w.r.t. solution: A minor bug or 2. Easy to miss.
// Complexity of code & results made this take a long time to debug. :-P
/**
 * @param {number[][]} board
 * @return {number[][]}
 */
var candyCrush = function (board) {
  const EMPTY = 0;
  const CRUSH = -1;

  function getAllToDelete() {
    const allToDelete = {};
    //  scan each row, mark sets of 3+ to remove
    for (let row = 0; row < board.length; row++) {
      let toDelete = [];
      for (let col = 0; col < board[0].length; col++) {
        if (col > 0
          && (board[row][col] === EMPTY
            || board[row][col] !== board[row][col - 1])) {
          addToDelete(toDelete, allToDelete);
        }

        if (board[row][col] !== EMPTY) {
          toDelete.push([row, col]);
        }
      }
      addToDelete(toDelete, allToDelete);
    }

    //  scan each col, mark sets of 3+ to remove (bottom up, until 0 hit)
    for (let col = 0; col < board[0].length; col++) {
      let toDelete = [];
      for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][col] === EMPTY) { // Early termination
          break;
        }

        if (row < board.length - 1
          && board[row][col] !== board[row + 1][col]) {
          addToDelete(toDelete, allToDelete);
        }
        toDelete.push([row, col]);
      }
      addToDelete(toDelete, allToDelete);
    }

    return allToDelete;
  }

  function addToDelete(toDelete, allToDelete) {
    if (toDelete.length >= 3) {
      for (const [row, col] of toDelete) {
        allToDelete[col] ??= new Set();
        allToDelete[col].add(row);
      }
    }
    toDelete.length = 0; // Clear array in place (no reassignment)
  }

  function crushCandy(allToDelete) {
    for (const col of Object.keys(allToDelete)) {
      for (const row of allToDelete[col]) {
        board[row][col] = CRUSH;
      }
    }
  }

  function dropCandy(allToDelete) {
    // Col by col, work from bottom to first empty or top
    for (const col of Object.keys(allToDelete)) {
      let numCrushed = 0;
      for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][col] === EMPTY) {
          break;
        } else if (board[row][col] === CRUSH) {
          numCrushed++;
          board[row][col] = EMPTY;
        } else if (numCrushed) { // Move candy down
          board[row + numCrushed][col] = board[row][col];
          board[row][col] = EMPTY;
        }
      }
    }
  }

  let allToDelete = getAllToDelete();
  while (Object.keys(allToDelete).length) {
    //  for all marked, remove
    crushCandy(allToDelete);
    dropCandy(allToDelete);
    allToDelete = getAllToDelete();
  }

  return board;
};