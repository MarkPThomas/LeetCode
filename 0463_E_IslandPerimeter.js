// 2025/06/02
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 16:16 min
// Patterns: Graph BFS, Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  // when checking directions, count lengths (1) of water edges
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

  let perimeterIsland = 0;

  const visited = {};

  function bfs(row, col) {
    let tiles = [[row, col]];
    visited[[row, col]] = true;

    while (tiles.length) {
      const nextTiles = [];
      for (let i = 0; i < tiles.length; i++) {
        const [tileRow, tileCol] = tiles[i];
        perimeterIsland += getAdj(tileRow, tileCol, nextTiles);
      }
      tiles = nextTiles;
    }
  }

  function getAdj(row, col, nextTiles) {
    let perimeterTile = 0;

    for (const [rowDelt, colDelt] of DIRS) {
      const rowNext = row + rowDelt;
      const colNext = col + colDelt;

      if (!isInBounds(rowNext, colNext) || !grid[rowNext][colNext]) { // Water or edge
        perimeterTile++;
        continue;
      }

      if (visited[[rowNext, colNext]]) {
        continue;
      }
      visited[[rowNext, colNext]] = true;

      nextTiles.push([rowNext, colNext]);
    }

    return perimeterTile;
  }

  function isInBounds(row, col) {
    return 0 <= row && row < grid.length
      && 0 <= col && col < grid[0].length;
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // Find first land square
      if (grid[row][col]) {
        bfs(row, col);
        return perimeterIsland;
      }
    }
  }

  return perimeterIsland;
};