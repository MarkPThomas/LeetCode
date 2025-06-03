// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 16:30 min
// Patterns: Graph BFS, Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  // track visited land tiles
  // for each unvisited tile, do BFS area calc, marking visited tiles
  //    can either be by modifying the grid, or tracking coords in a hashmap
  // at end, check against max area & continune search
  const LAND = 1;

  function getLandArea(startRow, startCol) {
    let area = 0;

    let tiles = [[startRow, startCol]];
    visited[[startRow, startCol]] = true;

    while (tiles.length) {

      const nextTiles = [];
      for (let i = 0; i < tiles.length; i++) {
        const [row, col] = tiles[i];
        getAdjLand(row, col, nextTiles);
        area++;
      }
      tiles = nextTiles;
    }

    return area;
  }

  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  function getAdjLand(row, col, nextTiles) {
    for (const [deltRow, deltCol] of DIRS) {
      const nextRow = row + deltRow;
      const nextCol = col + deltCol;

      if (!isInBounds(nextRow, nextCol)
        || grid[nextRow][nextCol] !== LAND
        || visited[[nextRow, nextCol]]) {

        continue;
      }

      nextTiles.push([nextRow, nextCol]);
      visited[[nextRow, nextCol]] = true;
    }
  }

  function isInBounds(row, col) {
    return 0 <= row && row < grid.length
      && 0 <= col && col < grid[0].length;
  }

  let maxArea = 0;

  const visited = {};
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === LAND && !visited[[row, col]]) {
        const currArea = getLandArea(row, col);
        maxArea = Math.max(maxArea, currArea);
      }
    }
  }

  return maxArea;
};