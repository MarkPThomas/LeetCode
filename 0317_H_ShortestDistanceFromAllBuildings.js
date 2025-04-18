// 2025/04/18
// O(n^2 * m^2) time complexity
// O(n * m) space complexity
// Time to complete: 51:08 min TLE @ 80/85
// Patterns: BFS
// Notes w.r.t. solution: Was close. Subtle gotchyas & differences in TLE for JavaScript.
//  Solution gets all right answers & runs fast enough locally, but gets TLE on submission.
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestDistance = function (grid) {
  // For each building, do BFS & tag cells w/ distance
  // First cell to have sum from all buildings is the starting point
  //      Sum of this cell is the result
  //  If no cell has a sum from all buildings, return -1

  const CLEAR = 0;
  const BUILDING = 1;

  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  function getNeighbors(row, col, label, step) {
    for (const [deltRow, deltCol] of DIRS) {
      const nextRow = row + deltRow;
      const nextCol = col + deltCol;

      // Check in-bounds
      if (nextRow < 0 || grid.length <= nextRow
        || nextCol < 0 || grid[0].length <= nextCol) {
        continue;
      }

      // Check clear
      if (grid[nextRow][nextCol] !== CLEAR) {
        continue;
      }

      // Check visited
      visited[label] = visited[label] || {};
      if (visited[label][[nextRow, nextCol]]) {
        continue;
      }
      visited[label][[nextRow, nextCol]] = true;

      step.push([nextRow, nextCol, label]);
    }
  }

  // Find all buildings
  const visited = {};
  let label = 0;
  let step = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === BUILDING) {
        label++;
        step.push([row, col, label]);
      }
    }
  }
  const numBuildings = label;

  let minDistance = Infinity;

  // BFS to write distances
  const distances = Array(grid.length).fill().map(() => Array(grid[0].length));
  let stepCount = -1;
  while (step.length) {
    stepCount++;

    const nextStep = [];
    for (let i = 0; i < step.length; i++) {
      const [row, col, label] = step[i];

      if (distances[row][col] === undefined) {
        distances[row][col] = { numReached: 0, distance: 0 };
      }
      const tile = distances[row][col];

      if (grid[row][col] === CLEAR) {
        // mark stepCount on tile
        tile.distance += stepCount;
        tile.numReached++;

        // check ending case
        if (tile.numReached === numBuildings) {
          minDistance = Math.min(minDistance, tile.distance);
        }
      }

      // get neighbors to continue
      getNeighbors(row, col, label, nextStep);
    }
    step = nextStep;
  }

  return minDistance === Infinity ? -1 : minDistance;
};