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
  const distance = {};

  const EMPTY = -1;   // No snake or ladder
  const MAX_ROLL = 6; // At most 6 possible destinations from any tile for 6-sided dice
  function addNextTiles(label, nextLabels) {
    const nextMaxLabel = Math.min(label + MAX_ROLL, MAX_VAL);

    if (nextMaxLabel === MAX_VAL) { // Move straight to end
      nextLabels.add(MAX_VAL);
    } else { // Get row/col for each label & add to next labels
      label++;

      while (label <= nextMaxLabel) {
        const [row, col] = getCoords(label);
        const value = board[row][col];

        // Value always intially input at min because either:
        //  1. We have iterated directly over it moving one label at a time,
        //      which is the max distance w/ ignoring cycles.
        //  2. We have 'jumped' ahead to it
        //  3. Any other case is moving backwards after we have taken 'label'moves to reach it
        // Label doesn't matter for this check because:
        //  1. By how we take value, we are only moving forward
        //  2. Moving forward in increments of 6, that is, so we CAN
        //      move backwards within the increment of 6 if it is using snakes & ladders
        //      which might allow for shorter paths than the max of 'label' moves to reach the tile
        //  3. Moving forward in increments of 6 is always from the worst-case or better (by using snakes & ladders)
        if (value in distance) { // Skip snake/ladder that is not a shortcut
          label++;
          continue;
        } else if (value === EMPTY) {   // Worst-case of stepping 1 at a time through labels
          nextLabels.add(label);
        } else { // We are on snake or ladder that is a shortcut
          nextLabels.add(value);
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

  let numMoves = 0;
  distance[1] = numMoves;

  let currLabels = [1];
  while (currLabels.length && numMoves <= MAX_VAL) { // At most it takes us n * n steps through each label
    const nextLabels = new Set();  // Avoids adding duplicate processing at each BFS ring

    for (let i = 0; i < currLabels.length; i++) {
      const label = currLabels[i];
      distance[label] ??= Infinity;
      distance[label] = Math.min(distance[label], numMoves);

      if (label === MAX_VAL) {  // We are at end
        return numMoves;
      }

      addNextTiles(label, nextLabels);
    }

    currLabels = [...nextLabels];
    numMoves++;
  }

  return -1;
};