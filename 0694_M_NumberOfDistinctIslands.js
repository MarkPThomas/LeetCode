// 2025/06/14
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 32:11 min
// Patterns: Graph DFS, Matrix
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
  // islands are the same if:
  //  1. Areas are the same
  //  2. Extents width/height are the same
  //  3. Every cell, with origin offset, matches (brute force)
  // we can assume an island is unique, calculating it's origin, area, extents
  // next, we can check all existing islands of the same area, then extents
  //  if there are any matches, check cell by cell
  // store islands by keys of area-width-height, store island origin

  const LAND = 1;

  function calcIsland(rowStart, colStart, visited) {
    let area = 0;
    let minRow = Infinity;
    let maxRow = -Infinity;
    let minCol = Infinity;
    let maxCol = -Infinity;

    const tiles = [[rowStart, colStart]];
    tiles[[rowStart, colStart]] = true;

    while (tiles.length) {
      const [row, col] = tiles.pop();
      getNextTiles(row, col, tiles, visited);

      area++;
      minRow = Math.min(minRow, row);
      maxRow = Math.max(maxRow, row);
      minCol = Math.min(minCol, col);
      maxCol = Math.max(maxCol, col);
    }

    const width = maxCol - minCol + 1;
    const height = maxRow - minRow + 1;
    return [area, width, height];
  }

  function islandsAreSame(island, similarIsland) {
    const visited = {};

    const [row1, col1] = island;
    const [row2, col2] = similarIsland;
    const deltRow = row2 - row1;
    const deltCol = col2 - col1;

    const tiles1 = [];
    tiles1.push(island);
    visited[island] = true;

    const tiles2 = [];
    tiles2.push(similarIsland);
    visited[similarIsland] = true;

    while (tiles1.length || tiles2.length) {
      const [row1, col1] = tiles1.pop();
      const [row2, col2] = tiles2.pop();

      if (row1 + deltRow !== row2 || col1 + deltCol !== col2) {
        return false;
      }

      getNextTiles(row1, col1, tiles1, visited);
      getNextTiles(row2, col2, tiles2, visited);
      if (tiles1.length !== tiles2.length) {
        return false;
      }
    }

    return true;
  }

  const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  function getNextTiles(row, col, tiles, visited) {
    for (const [deltRow, deltCol] of DIRS) {
      const nextRow = row + deltRow;
      const nextCol = col + deltCol;

      if (!isInBounds(nextRow, nextCol)
        || grid[nextRow][nextCol] !== LAND
        || visited[[nextRow, nextCol]]) {
        continue;
      }

      tiles.push([nextRow, nextCol]);
      visited[[nextRow, nextCol]] = true;
    }
  }

  function isInBounds(row, col) {
    return 0 <= row && row < grid.length
      && 0 <= col && col < grid[0].length;
  }

  function getKey(area, width, height) {
    return `${area}-${width}-${height}`;
  }

  let numIslands = 0;
  const islands = {};
  const visitedGlobal = {};
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === LAND && !visitedGlobal[[row, col]]) {
        const island = [row, col];

        const [area, width, height] = calcIsland(...island, visitedGlobal);
        const key = getKey(area, width, height);

        let isUnique = true;
        if (key in islands) {
          for (const similarIsland of islands[key]) {
            if (islandsAreSame(island, similarIsland)) {
              isUnique = false;
              break;
            }
          }
        } else {
          islands[key] = [];
        }

        if (isUnique) {
          islands[key].push(island);
          numIslands++;
        }
      }
    }
  }

  return numIslands;
};

// ===== Solution =====
// O(m * n) time complexity
// O(m * n) space complexity
// Patterns: Graph DFS, Matrix, Hashing
// Notes w.r.t. solution: A bit faster than my solution
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
  const LAND = 1;
  const UP = 'U';
  const DOWN = 'D';
  const RIGHT = 'R';
  const LEFT = 'L';
  const ENTER = '0';
  const EXIT = '0';

  const visited = {};
  function hashIsland(row, col, dir, currentIsland) {
    if (!isInBounds(row, col) || visited[[row, col]] || grid[row][col] !== LAND) {
      return;
    }
    visited[[row, col]] = true;

    currentIsland.push(dir);
    hashIsland(row + 1, col, DOWN, currentIsland);
    hashIsland(row - 1, col, UP, currentIsland);
    hashIsland(row, col + 1, RIGHT, currentIsland);
    hashIsland(row, col - 1, LEFT, currentIsland);
    currentIsland.push(EXIT);
  }

  function isInBounds(row, col) {
    return 0 <= row && row < grid.length
      && 0 <= col && col < grid[0].length;
  }

  const islands = new Set();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const currentIsland = [];
      hashIsland(row, col, ENTER, currentIsland);
      if (currentIsland.length) {
        islands.add(currentIsland.join(''));
      }
    }
  }

  return islands.size;
};