// 2025/07/03
// O(m * n * max(m, n)) time complexity
// O(m * n) space complexity
// Time to complete: 30:47 min
// Patterns: Matrix BFS
// Notes w.r.t. solution:
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
var shortestDistance = function (maze, start, destination) {
  // BFS
  // For each kick, count tiles
  // Maze I went by fewest kicks, so ball immediately went to wall
  // Maze II goes by distance, so make this turn-based, tracking ball position
  // for each turn:
  //      ball has direction & total tile count
  //      ball advances in direction unless wall is next
  //      if wall is next, add all viable directions to kick
  //          this includes excluding the prev direction
  // Visited should still be tracked for each kick position
  const WALL = 1;
  const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  function isInBounds(row, col) {
    return 0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length;
  }

  let count = 0;
  const visited = {};
  let moves = [[start, [0, 0]]];
  while (moves.length) {
    const nextMoves = [];

    for (let i = 0; i < moves.length; i++) {
      const [[row, col], dir] = moves[i];

      const rowRoll = row + dir[0];
      const colRoll = col + dir[1];
      if (!isInBounds(rowRoll, colRoll)
        || maze[rowRoll][colRoll] === WALL
        || (row === start[0] && col === start[1])) { // Ball is stopped

        if (row === destination[0] && col === destination[1]) {
          return count;
        } else if (visited[[row, col]]) {
          continue;
        }
        visited[[row, col]] = true;

        // Kick in all viable directions
        for (const [rowDelt, colDelt] of DIRS) {
          // Ignore prev direction
          if (rowDelt === -dir[0] && colDelt === -dir[1]) {
            continue;
          }

          // Try any other direction, keep only those that aren't blocked by wall
          const rowKick = row + rowDelt;
          const colKick = col + colDelt;
          if (isInBounds(rowKick, colKick) && maze[rowKick][colKick] !== WALL) {
            nextMoves.push([[rowKick, colKick], [rowDelt, colDelt]]);
          }
        }
      } else { // Let ball keep rolling
        nextMoves.push([[rowRoll, colRoll], dir]);
      }
    }

    moves = nextMoves;
    count++;
  }

  return -1;
};

// ===== Solutions =====
// O(m * n * max(m, n)) time complexity
// O(m * n) space complexity
// Patterns: Matrix BFS (Turns by kicks)
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
var shortestDistance = function (maze, start, destination) {
  const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const WALL = 1;

  function getNextKicks(cell, nextKicks, dist) {
    for (const delta of DIRS) {
      let [row, col] = cell;  // Start @ original position
      let distNext = dist;

      while (canMove([row, col], delta)) { // Roll ball to last valid tile
        row += delta[0];
        col += delta[1];
        distNext++;
      }

      nextKicks.push([[row, col], distNext]);
    }
  }

  function canMove(cell, delta) {
    const nextRow = cell[0] + delta[0];
    const nextCol = cell[1] + delta[1];

    return (isInBounds(nextRow, nextCol)
      && maze[nextRow][nextCol] !== WALL);
  }

  function isInBounds(row, col) {
    return (0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length);
  }

  const visited = {};

  let kicks = [[start, 0]];
  while (kicks.length) {

    const nextKicks = [];
    for (const [kick, dist] of kicks) {
      if (kick in visited && visited[kick] <= dist) {
        continue;
      }
      visited[kick] = dist;

      getNextKicks(kick, nextKicks, dist);
    }
    kicks = nextKicks;
  }

  return destination in visited ? visited[destination] : -1;
};


// O(m * n * max(m, n)) time complexity
// O(m * n) space complexity
// Patterns: Matrix BFS (Turns by distance)
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
var shortestDistance = function (maze, start, destination) {
  const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const WALL = 1;

  function getNextKicks(cell, nextKicks, deltaPrev = null) {
    if (deltaPrev !== null && canMove(cell, deltaPrev)) {
      nextKicks.push([
        [cell[0] + deltaPrev[0], cell[1] + deltaPrev[1]],
        deltaPrev
      ]);
    } else {
      for (const delta of DIRS) {
        if (canMove(cell, delta)) {
          nextKicks.push([
            [cell[0] + delta[0], cell[1] + delta[1]],
            delta
          ]);
        }
      }
    }
  }

  function canMove(cell, delta) {
    const nextRow = cell[0] + delta[0];
    const nextCol = cell[1] + delta[1];

    return (isInBounds(nextRow, nextCol)
      && maze[nextRow][nextCol] !== WALL);
  }

  function isInBounds(row, col) {
    return (0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length);
  }

  function hitsHole(cell) {
    return cell[0] === destination[0] && cell[1] === destination[1];
  }

  const visited = {};

  let kicks = [[start, null]];
  let distance = 0;
  while (kicks.length) {

    const nextKicks = [];
    for (const [kick, deltaPrev] of kicks) {
      if (deltaPrev === null || !canMove(kick, deltaPrev)) {
        if (visited[kick]) {
          continue;
        }
        visited[kick] = true;

        if (hitsHole(kick)) {
          return distance;
        }
      }

      getNextKicks(kick, nextKicks, deltaPrev);
    }
    distance++;
    kicks = nextKicks;
  }

  return -1;
};

// O(m * n * max(m, n)) time complexity
// O(m * n) space complexity
// Patterns: Matrix BFS, Dijkstra's
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
var shortestDistance = function (maze, start, destination) {
  const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const WALL = 1;

  function getNextKicks(cell, dist) {
    const nextKicks = [];

    for (const delta of DIRS) {
      let [row, col] = cell;
      let distNext = dist;
      while (canMove([row, col], delta)) {
        row += delta[0];
        col += delta[1];
        distNext++;
      }

      if (distNext > dist) {
        nextKicks.push(new State([row, col], distNext));
      }
    }

    return nextKicks;
  }

  function canMove(cell, delta) {
    const nextRow = cell[0] + delta[0];
    const nextCol = cell[1] + delta[1];

    return (isInBounds(nextRow, nextCol)
      && maze[nextRow][nextCol] !== WALL);
  }

  function isInBounds(row, col) {
    return (0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length);
  }

  function hitsHole(cell) {
    return cell[0] === destination[0] && cell[1] === destination[1];
  }

  const pq = new PriorityQueue(
    (a, b) => a.dist - b.dist
  );

  const visited = {};
  pq.enqueue(new State(start));

  while (pq.size()) {
    const { cell, dist } = pq.dequeue();

    if (visited[cell]) {
      continue;
    }
    visited[cell] = true;

    if (hitsHole(cell)) {
      return dist;
    }

    for (const nextState of getNextKicks(cell, dist)) {
      pq.enqueue(nextState);
    }
  }

  return -1;
};

class State {
  constructor(cell, dist = 0) {
    this.cell = cell;
    this.dist = dist;
  }
}