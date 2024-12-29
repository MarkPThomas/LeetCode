// 2024/12/28
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = # rows, n = #cols
// Time to complete: xx min
// Patterns: Graphs, BFS
// Notes w.r.t. solution: Simplified solution after reviewing editorial
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const FRESH = 1;
  const ROTTEN = 2;

  const DIRS = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  function rotNeighbors(row, col, neighbors, freshOranges) {
    for (const [rowDelt, colDelt] of DIRS) {
      const nextRow = row + rowDelt;
      const nextCol = col + colDelt;

      if (nextRow < 0 || grid.length <= nextRow
        || nextCol < 0 || grid[row].length <= nextCol) {
        continue;
      }

      if (grid[nextRow][nextCol] === FRESH) {
        grid[nextRow][nextCol] = ROTTEN;
        freshOranges--;
        neighbors.push([nextRow, nextCol]);
      }

    }

    return freshOranges;
  }

  function getOranges() {
    let rottenOranges = [];
    let freshOranges = 0;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] === ROTTEN) {
          rottenOranges.push([row, col]);
        } else if (grid[row][col] === FRESH) {
          freshOranges++;
        }
      }
    }

    return [rottenOranges, freshOranges];
  }


  let [rottenOranges, freshOranges] = getOranges();
  if (!freshOranges) {
    return 0;
  }

  let minutes = -1;
  while (rottenOranges.length) {
    const nextRotten = [];
    for (let i = 0; i < rottenOranges.length; i++) {
      const [row, col] = rottenOranges[i];
      freshOranges = rotNeighbors(row, col, nextRotten, freshOranges);
    }

    minutes++;
    rottenOranges = nextRotten;
  }

  return freshOranges === 0 ? minutes : -1;
};

// 2024/12/28
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = # rows, n = #cols
// Time to complete: xx min
// Patterns: Graphs, BFS
// Notes w.r.t. solution: Refactored prior solution to be a bit cleaner
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  // Case3:
  // 1. No oranges to rot: = 0, Handled implicity by never triggering a BFS
  //  a. No oranges = 0;
  //  b. All rotten oranges = 0.
  // 2. Impossible: = -1 & break
  //  a. All fresh oranges
  //  b. Non-adjacent fresh orange set
  //      I. Early termination for no neighbors
  //      II. Late termination for +1 connected isolated fresh oranges
  // 3. Count rotten days - Begin BFS & count radius steps
  //      There may be multiple disconnected cases

  const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  function getNeighbors(row, col, neighbors) {
    for (const dir of directions) {
      const nextRow = row + dir[0];
      const nextCol = col + dir[1];

      // Skip if out of bounds or not fresh & unvisited (what about)
      if (nextRow < 0 || grid.length <= nextRow
        || nextCol < 0 || grid[row].length <= nextCol
        || grid[nextRow][nextCol] === 0) {
        continue;
      }

      neighbors.push([nextRow, nextCol]);
    }
  }

  function getRottenOranges(rottenOranges) {
    let orangesCount = 0;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== 0) {
          // visited[[row, col]] = false;
          orangesCount++;
          if (grid[row][col] === 1) {
            const neighbors = [];
            getNeighbors(row, col, neighbors);
            // if no dirs, return -1 (case 2)
            if (!neighbors.length) {
              return -1;
            } else {
              continue;
            }
          } else {
            rottenOranges.push([row, col]);
          }
        }
      }
    }

    return orangesCount;
  }

  // Get rotten oranges & check for impossible case
  const rottenOranges = [];
  const orangesCount = getRottenOranges(rottenOranges);

  if (!orangesCount) {
    // No oranges left to rot, we are already done
    return 0;
  } else if (orangesCount === -1 || !rottenOranges.length) {
    // Impossible to rot all oranges
    // No rotten oranges, so oranges will never rot
    return -1;
  }

  // Initialize all rotten oranges as BFS on dirs
  const visited = {};
  let current = [];
  for (const rottenOrange of rottenOranges) {
    visited[rottenOrange] = true;
    getNeighbors(rottenOrange[0], rottenOrange[1], current);
  }

  // BFS on dirs
  let days = 0;
  while (current.length) {
    const next = [];
    while (current.length) {
      const [row, col] = current.pop();
      if (visited[[row, col]] || grid[row][col] === 2) {
        continue;
      }
      visited[[row, col]] = true;

      getNeighbors(row, col, next);
    }

    current = next;
    if (current.length) {
      days++;
    }
  }

  // Check all oranges rotten
  return Object.keys(visited).length === orangesCount ? days : -1;
};

// 2024/10/23
// O(m * n) time complexity
// O(m * n) space complexity
//  where m = # rows, n = #cols
// Time to complete: 42:27 min
// Patterns: Graphs, BFS
// Notes w.r.t. solution: Problem was poorly worded, required some guessing that led to suboptimal solutions & lost time.
//  Solved in 28:00 otherwise.
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  // Case3:
  // 1. No oranges to rot: = 0, Handled implicity by never triggering a BFS
  //  a. No oranges = 0;
  //  b. All rotten oranges = 0.
  // 2. Impossible: = -1 & break
  //  a. All fresh oranges
  //  b. Non-adjacent fresh orange set
  //      I. Early termination for no neighbors
  //      II. Late termination for +1 connected isolated fresh oranges
  // 3. Count rotten days - Begin DFS & count radius steps
  //      There may be multiple disconnected cases

  const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  function getNeighbors(row, col) {
    const neighbors = [];

    for (const dir of directions) {
      const nextRow = row + dir[0];
      const nextCol = col + dir[1];

      // Skip if out of bounds or not fresh & unvisited (what about)
      if (nextRow < 0 || grid.length <= nextRow
        || nextCol < 0 || grid[row].length <= nextCol
        || grid[nextRow][nextCol] === 0) {
        continue;
      }

      neighbors.push([nextRow, nextCol]);
    }

    return neighbors;
  }

  // Get rotten oranges & check for impossible case
  let orangesCount = 0;
  const rottenOranges = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== 0) {
        // visited[[row, col]] = false;
        orangesCount++;
        if (grid[row][col] === 1) {
          let neighbors = getNeighbors(row, col);
          // if no dirs, return -1 (case 2)
          if (!neighbors.length) {
            return -1;
          } else {
            continue;
          }
        } else {
          rottenOranges.push([row, col]);
        }
      }
    }
  }

  // No oranges
  if (!orangesCount) {
    return 0;
  }

  // No rotten oranges
  if (!rottenOranges.length) {
    return -1;
  }

  // Initialize all rotten oranges as BFS on dirs
  const visited = {};
  let current = [];
  for (const rottenOrange of rottenOranges) {
    visited[rottenOrange] = true;
    let next = getNeighbors(rottenOrange[0], rottenOrange[1]);
    if (next.length) {
      current.push(...next);
    }
  }

  // BFS on dirs
  let days = 0;
  while (current.length) {
    let next = [];
    while (current.length) {
      const coord = current.pop();
      if (visited[coord] || grid[coord[0]][coord[1]] === 2) {
        continue;
      }
      visited[coord] = true;

      let neighbors = getNeighbors(coord[0], coord[1]);
      next.push(...neighbors);
    }

    if (next.length) {
      current = next;
      days++;
    }
  }

  // Check all oranges rotten
  return Object.keys(visited).length === orangesCount ? days : -1;
};