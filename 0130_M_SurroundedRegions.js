// O(m * n) time complexity
// O(m * n) -> O(1) space complexity (latter if we temporarily mark valid visited on board & then reverse)
// Time to complete: 28:46 min
// Patterns: DFS
// Notes w.r.t. solution: Would have been much faster using recursion DFS & marking board, but those are less optimal.
// O(m * n) time complexity
// O(m * n) -> O(1) space complexity (latter if we temporarily mark valid visited on board & then reverse)
// Time to complete: 28:46 min
// Patterns: DFS
// Notes w.r.t. solution: Would have been much faster using recursion DFS & marking board, but those are less optimal.
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const VALID = "O";
  const CAPTURED = "X";

  // if 0 is on edge, ignore
  //  Do one cycle around board edge to find all of these
  const edgeTiles = [];
  for (let row = 0; row < board.length; row++) {
    addIfValid(row, 0, edgeTiles);
    addIfValid(row, board[0].length - 1, edgeTiles);
  }

  for (let col = 1; col < board[0].length - 1; col++) {
    addIfValid(0, col, edgeTiles);
    addIfValid(board.length - 1, col, edgeTiles);
  }

  // Mark all void 0 in a 'visited' hashmap
  const edgeRegion = {};
  // any adjacent 0 is also ignored
  //  For each 0 Edge node combine using DFS/BFS or DSU
  while (edgeTiles.length) {
    const [row, col] = edgeTiles.pop();

    if ([row, col] in edgeRegion) {
      continue;
    }
    edgeRegion[[row, col]] = true;

    addAdjTiles(row, col, edgeTiles);
  }

  // swap all other 0s to X
  for (let row = 1; row < board.length - 1; row++) {
    for (let col = 1; col < board[0].length - 1; col++) {
      if (!([row, col] in edgeRegion)) {
        board[row][col] = CAPTURED;
      }
    }
  }


  function addAdjTiles(row, col, edgeTiles) {
    for (const [rowDelta, colDelta] of DIRS) {
      const rowNext = row + rowDelta;
      const colNext = col + colDelta;

      if (!([rowNext, colNext] in edgeRegion)
        && isInBounds(rowNext, colNext)) {

        addIfValid(rowNext, colNext, edgeTiles);
      }
    }
  }

  function isInBounds(row, col) {
    return (0 <= row && row < board.length
      && 0 <= col && col < board[0].length);
  }

  function addIfValid(row, col, edgeTiles) {
    if (isValidTile(row, col)) {
      edgeTiles.push([row, col]);
    }
  }

  function isValidTile(row, col) {
    return board[row][col] === VALID;
  }
};