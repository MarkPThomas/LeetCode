// 2025/04/25
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: OT min
// Patterns: Graph - BFS
// Notes w.r.t. solution: 2025: Was on right track. Logic was mostly correct.
/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function (grid) {
  // array or hash of island [origin(unique), area]?
  //  Best order for queue might be a max priority queue.
  //  Greedy strategy - start with largest island area & find connecting neighbors
  //  Optimization w. more complexity - mark islands such that we know which is encountered
  //      We can then mark a 'paired' set, and skip any additional hits or A->B then B->A redundancies
  //  Instead of modifying existing matrix, we can make a new matrix with cell properties:
  //      Island key (origin), area

  const WATER = 0;
  const LAND_UNVISITED = 1;

  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  function isInBounds(row, col) {
    return (0 <= row && row < grid.length
      && 0 <= col && col < grid[0].length);
  }

  function getNeighbors(row, col, neighbors, target) {
    for (const [deltRow, deltCol] of DIRS) {
      const nextRow = row + deltRow;
      const nextCol = col + deltCol;

      if (isInBounds(nextRow, nextCol)
        && grid[nextRow][nextCol] !== WATER
        && (!target || grid[nextRow][nextCol] === target)) {

        neighbors.push([nextRow, nextCol]);
      }
    }
  }

  function buildIsland(rowStart, colStart) {
    let land = [[rowStart, colStart]];

    let area = 0;
    while (land.length) {
      const nextLand = [];

      for (let i = 0; i < land.length; i++) {
        const [row, col] = land[i];
        if (grid[row][col] !== LAND_UNVISITED) {
          continue;
        }
        grid[row][col] = islandKey;

        area++;

        getNeighbors(row, col, nextLand, LAND_UNVISITED);
      }

      land = nextLand;
    }

    return area;
  }

  function getJoinedArea(waterRow, waterCol) {
    const land = [];
    getNeighbors(waterRow, waterCol, land);

    let area = 1;
    const visited = new Set();
    for (const [landRow, landCol] of land) {
      const island = grid[landRow][landCol];
      if (visited.has(island)) {
        continue;
      }
      visited.add(island);

      area += islandAreas[island];
    }

    return area;
  }

  const islandAreas = {};

  // Build Islands
  let islandKey = 2; // Choosing 2 to mark visited land
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === LAND_UNVISITED) {
        islandAreas[islandKey] = buildIsland(row, col);
        islandKey++;
      }
    }
  }

  const islandCount = islandKey - 2;
  if (!islandCount) {
    // Only water, can only get 1 by turning 1 tile
    return 1;
  } else if (islandCount === 1) {
    const islandArea = islandAreas[islandCount + 1];
    return (islandArea === grid.length * grid[0].length)
      ? islandArea     // No water
      : islandArea + 1 // Only 1 island w/ water, so at most can turn 1 extra tile
  }

  // Connect islands
  let maxJoinedArea = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== WATER) {
        continue;
      }

      maxJoinedArea = Math.max(maxJoinedArea, getJoinedArea(row, col));
    }
  }

  return maxJoinedArea;
};