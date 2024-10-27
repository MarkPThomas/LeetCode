// 2024/10/27
// O(m * n) time complexity
// O(min(m, n)) space complexity
// Time to complete: NA
// Patterns: BFS
// Notes w.r.t. solution: TLE @ 39/49, regardless which style of queue is used
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const LAND = '1';
  const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  const visited = {};

  function addNeighbors(row, col, coords) {
    for (const [rowDelt, colDelt] of directions) {
      const nextRow = row + rowDelt;
      const nextCol = col + colDelt;

      if (nextRow < 0 || numRows <= nextRow
        || nextCol < 0 || numCols <= nextCol
        || grid[nextRow][nextCol] !== LAND) {
        continue;
      }

      const coord = [nextRow, nextCol];

      if (visited[coord]) {
        continue;
      }

      coords.push(coord);
    }
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === LAND) {
        const root = [row, col];
        if (visited[root]) {
          continue;
        }

        count++;

        let coords = [root];
        while (coords.length) {

          const nextCoords = []
          for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            visited[coord] = true;

            addNeighbors(coord[0], coord[1], nextCoords);
          }

          coords = nextCoords;
        }
      }
    }
  }

  return count;
};

// 2024/10/27
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: NA
// Patterns: DFS
// Notes w.r.t. solution:
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const LAND = '1';
  const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  const visited = {};

  function addNeighbors(row, col, coords) {
    for (const [rowDelt, colDelt] of directions) {
      const nextRow = row + rowDelt;
      const nextCol = col + colDelt;

      if (nextRow < 0 || numRows <= nextRow
        || nextCol < 0 || numCols <= nextCol
        || grid[nextRow][nextCol] !== LAND) {
        continue;
      }

      const coord = [nextRow, nextCol];

      if (visited[coord]) {
        continue;
      }

      coords.push(coord);
    }
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === LAND) {
        const root = [row, col];
        if (visited[root]) {
          continue;
        }

        count++;

        const coords = [root];
        while (coords.length) {
          const coord = coords.pop();
          visited[coord] = true;

          addNeighbors(coord[0], coord[1], coords);
        }
      }
    }
  }

  return count;
};

// 2024/10/26
// O(m * n) time complexity
// O(m * n) space complexity
// Time to complete: 19:30 min
// Patterns: DSU
// Notes w.r.t. solution: Placed an errant break in direction check that made this wrong to OT. Otherwise correct.
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const LAND = '1';
  const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];

  const numRows = grid.length;
  const numCols = grid[0].length;
  const dsu = new DSU(numRows * numCols, numCols);

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === LAND) {
        count++;

        for (const [rowDelt, colDelt] of directions) {
          const nextRow = row + rowDelt;
          const nextCol = col + colDelt;

          if (nextRow < 0 || numRows <= nextRow
            || nextCol < 0 || numCols <= nextCol
            || grid[nextRow][nextCol] !== LAND) {
            continue;
          }

          if (dsu.union2D(nextRow, nextCol, row, col)) {
            count--;
          }
        }
      }
    }
  }

  return count;
};

class DSU {
  constructor(n, cols) {
    this.cols = cols;
    this.roots = [];
    this.ranks = [];
    for (let i = 0; i < n; i++) {
      this.roots[i] = i;
      this.ranks[i] = 1;
    }
  }

  find(x) {
    if (this.roots[x] !== x) {
      this.roots[x] = this.find(this.roots[x]);
    }

    return this.roots[x];
  }

  union2D(childRow, childCol, parentRow, parentCol) {
    const child = childRow * this.cols + childCol;
    const parent = parentRow * this.cols + parentCol;

    return this.union(child, parent);
  }

  union(child, parent) {
    let childRoot = this.find(child);
    let parentRoot = this.find(parent);

    if (childRoot === parentRoot) {
      return false;
    }

    if (this.ranks[childRoot] > this.ranks[parentRoot]) {
      const swap = childRoot;
      childRoot = parentRoot;
      parentRoot = swap;
    }

    this.roots[childRoot] = parentRoot;
    this.ranks[parentRoot] += this.ranks[childRoot];

    return true;
  }
}