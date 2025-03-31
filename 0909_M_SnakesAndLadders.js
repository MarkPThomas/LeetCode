// O(n^2) time complexity
// O(n^2) space complexity
// Time to complete: OT min
// Patterns: Graph - BFS
// Notes w.r.t. solution:Took 10 min just to understand the problem.
//  LOTS of complex coding & navigation of matrix required.
//  This is a HARD problem beyond initial solution outline.
/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
  // BFS w/ complex movement rules
  const n = board.length;
  const MAX_VAL = n ** 2; // Max board label
  const visited = {};

  const EMPTY = -1;   // No snake or ladder
  const MAX_ROLL = 6; // At most 6 possible destinations from any tile for 6-sided dice
  function addNextTiles(label, nextLabels) {
    const nextMaxLabel = Math.min(label + MAX_ROLL, MAX_VAL);
    if (nextMaxLabel === MAX_VAL) { // Move straight to end
      nextLabels.push(MAX_VAL);
    } else {
      // Get row/col for each label & add to nextTiles
      label++;
      while (label <= nextMaxLabel) {
        if (visited[label]) {
          label++;
          continue;
        }

        const [row, col] = getCoords(label);
        const value = board[row][col];
        if (value === EMPTY) {
          nextLabels.push(label);
        } else if (!visited[value]) { // We are on snake or ladder, add the destination label if not yet visited
          // Moving to any tile w/ snake or ladder moves to dest in same move
          // Since next curr + 1 as min, we cannot continue on other snakes & ladders from the same tile in later moves
          nextLabels.push(value);
        }

        label++;
      }
    }

  }

  function getCoords(label) {
    const k = Math.ceil(label / n); // row count, 1, 2, 3...
    const row = n - k;

    let col = (label - 1) % n;
    if (!(k % 2)) { // even row count, reverse col coord
      col = (n - 1) - col;
    }

    return [row, col];
  }

  let currLabels = [1];
  let numMoves = 0;
  while (currLabels.length && numMoves <= MAX_VAL) {
    const nextLabels = [];

    for (let i = 0; i < currLabels.length; i++) {
      const label = currLabels[i];
      visited[label] = true;

      if (label === MAX_VAL) {  // We are at end
        return numMoves;
      }

      addNextTiles(label, nextLabels);
    }

    currLabels = nextLabels;
    numMoves++;
  }

  return -1;
};