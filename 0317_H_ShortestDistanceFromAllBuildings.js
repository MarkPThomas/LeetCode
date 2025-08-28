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

// ===== Solutions =====
// O(n^2 * m^2) time complexity
// O(n * m) space complexity
// Patterns: BFS
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const EMPTY = 0;
const HOUSE = 1;
const OBSTACLE = 2;

let bfs = function (grid, distances, row, col) {
  const visited = new Array(grid.length).fill().map(
    () => new Array(grid[0].length).fill(false));
  visited[row][col] = true;

  let cells = [[row, col]];
  let steps = 0;
  while (cells.length) {

    const nextCells = [];
    for (let i = 0; i < cells.length; i++) {
      const [row, col] = cells[i];

      if (grid[row][col] === EMPTY) {
        distances[row][col].sumDist += steps;
        distances[row][col].numHouses++;
      }

      for (const [rowDelt, colDelt] of DIRS) {
        const nextRow = row + rowDelt;
        const nextCol = col + colDelt;

        if (isInBounds(nextRow, nextCol, grid)
          && !visited[nextRow][nextCol]
          && grid[nextRow][nextCol] === EMPTY) {

          visited[nextRow][nextCol] = true;
          nextCells.push([nextRow, nextCol]);
        }

      }
    }

    cells = nextCells;
    steps++;
  }
};

let isInBounds = function (row, col, grid) {
  return 0 <= row && row < grid.length
    && 0 <= col && col < grid[0].length;
}

let shortestDistance = function (grid) {
  // Store { total_dist, houses_count } for each cell.
  const distances = new Array(grid.length).fill().map(
    () => new Array(grid[0].length).fill().map(
      () => ({ numHouses: 0, sumDist: 0 }
      )));

  // Count houses and start BFS from each house.
  let totalHouses = 0;
  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[0].length; ++col) {
      if (grid[row][col] === HOUSE) {
        totalHouses++;
        bfs(grid, distances, row, col);
      }
    }
  }

  // Check all empty lands with houses count equal to total houses & find the min ans.
  let minDistance = Infinity;
  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[0].length; ++col) {
      if (distances[row][col].numHouses === totalHouses) {
        minDistance = Math.min(minDistance, distances[row][col].sumDist);
      }
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
};