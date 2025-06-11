// 2025/06/11
// O(m * n * (m + n)) time complexity (m + n for each kick dir going to a wall at the other end)
// O(min(m, n)) space complexity
// Time to complete: 45:50 min
// Patterns: Graph BFS
// Notes w.r.t. solution: Lots to code AND some tricky logic to work out, just takes a lot of time.
// I also maybe made it more complex than it needed to be by breaking it up too much/too early,
//  e.g. tracking prev dir to not kick ball back added more complexity to avoid 1 useless kick (since visited stops this 1 step further)
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
var hasPath = function (maze, start, destination) {
  // events - ball is kicket at start, and once it hits a wall
  //  ball can be hit in 1 of 4 directions
  //  ball continues rolling in that direction until it hits a wall

  // Visited:
  // only get kickDirs from a coord once
  // kickDirs ignore prev dir

  const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const WALL = 1;

  function getNextDirs(rowStart, colStart, prevDir) {
    const nextDirs = [];
    for (const [rowDelt, colDelt] of DIRS) {
      const row = rowStart + rowDelt;
      const col = colStart + colDelt;

      if (!isInBounds(row, col)
        || (prevDir && isPrevDir(rowDelt, colDelt, ...prevDir))
        || maze[row][col] === WALL) {
        continue;
      }

      nextDirs.push([rowDelt, colDelt]);
    }

    return nextDirs;
  }

  function isPrevDir(rowDelt, colDelt, prevRowDelt, prevColDelt) {
    return (rowDelt && rowDelt === -prevRowDelt)
      || (colDelt && colDelt === -prevColDelt);
  }

  function isInBounds(row, col) {
    return (0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length);
  }

  function getKickEnd(rowStart, colStart, rowDelt, colDelt) {
    let rowNext = rowStart;
    let colNext = colStart;
    while (isInBounds(rowNext, colNext) && maze[rowNext][colNext] !== WALL) {
      rowNext += rowDelt;
      colNext += colDelt;
    }
    rowNext -= rowDelt;
    colNext -= colDelt;

    return [rowNext, colNext];
  }

  const visited = {};
  visited[start] = true;

  let kicks = [[start, null]];
  while (kicks.length) {
    const nextKicks = [];
    for (let i = 0; i < kicks.length; i++) {
      const [kick, prevDir] = kicks[i];

      const kickDirs = getNextDirs(...kick, prevDir);
      for (const kickDir of kickDirs) {
        const kickEnd = getKickEnd(...kick, ...kickDir);
        if (kickEnd[0] === destination[0]
          && kickEnd[1] === destination[1]) {
          return true;
        }

        if (visited[kickEnd]) {
          continue;
        }
        visited[kickEnd] = true;

        nextKicks.push([kickEnd, kickDir]);
      }
    }
    kicks = nextKicks;
  }

  return false;
};