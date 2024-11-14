// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 20:15/18:10 min
// Patterns: BFS, Matrix
// Notes w.r.t. solution: Solved inefficient BFS in 18:10 & got TLE @ 48/50.
// After hint, re-solved more efficiently in 20:15.
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  const seen = {};
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

  function getNeighbors(row, col) {
    const queue = [];

    for (const dir of DIRS) {
      const rowNext = row + dir[0];
      const colNext = col + dir[1];

      if (rowNext < 0 || mat.length <= rowNext
        || colNext < 0 || mat[0].length <= colNext
        || mat[rowNext][colNext] === 0
        || seen[[rowNext, colNext]]) {
        continue;
      }

      seen[[rowNext, colNext]] = true;
      queue.push([rowNext, colNext]);
    }

    return queue;
  }

  let tiles = [];
  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (mat[row][col] === 0) {
        tiles.push(...getNeighbors(row, col));
      }
    }
  }

  let dist = 0;
  while (tiles.length) {
    dist++;

    const nextTiles = [];
    for (let i = 0; i < tiles.length; i++) {
      const [nextRow, nextCol] = tiles[i];
      mat[nextRow][nextCol] = dist;

      nextTiles.push(...getNeighbors(nextRow, nextCol));
    }
    tiles = nextTiles;
  }
  return mat;
};