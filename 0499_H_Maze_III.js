// 2025/08/30
// O(m * n) time complexity
// O(min(m, n)) space complexity
// Time to complete: 1:01:09 min
// Patterns: Matrix BFS
// Notes w.r.t. solution: Would have solved somewhat faster but had row/col dirs swapped. ;-P
/**
 * @param {number[][]} maze
 * @param {number[]} ball
 * @param {number[]} hole
 * @return {string}
 */
var findShortestWay = function (maze, ball, hole) {
  const WALL = 1;
  const DIRS = { 'd': [1, 0], 'l': [0, -1], 'r': [0, 1], 'u': [-1, 0] };

  function hitsHole(coord) {
    return coord[0] === hole[0] && coord[1] === hole[1];
  }

  function canMove(coord, delt) {
    const nextRow = coord[0] + delt[0];
    const nextCol = coord[1] + delt[1];

    return isInBounds(nextRow, nextCol) && maze[nextRow][nextCol] !== WALL;
  }

  function isInBounds(row, col) {
    return 0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length;
  }

  const visited = {};
  let kicks = [[ball, '']];
  while (kicks.length) {

    const nextKicks = [];
    for (const [cell, path] of kicks) {

      const dirPrev = path[path.length - 1] ?? '';
      if (dirPrev && canMove(cell, DIRS[dirPrev])) { // Ball is moving
        // Increment ball movement
        const xMove = cell[0] + DIRS[dirPrev][0];
        const yMove = cell[1] + DIRS[dirPrev][1];

        // Ball falls into hole or keeps rolling
        if (hitsHole([xMove, yMove])) {
          return path;
        } else {
          nextKicks.push([[xMove, yMove], path]);
        }
      } else if (!(cell in visited)) { // Ball has stopped at new position, kick again
        visited[cell] = true;
        // Try kicking in each direction, recording path
        for (const [dir, deltas] of Object.entries(DIRS)) {
          if (canMove(cell, deltas)) {
            const xNext = cell[0] + deltas[0];
            const yNext = cell[1] + deltas[1];

            // Ball falls into hole or keeps rolling
            if (hitsHole([xNext, yNext])) {
              return path + dir;
            } else {
              nextKicks.push([[xNext, yNext], path + dir]);
            }
          }
        }
      }
    }

    kicks = nextKicks;
  }

  return 'impossible';
};

// ===== Solutions =====
// O(m * n) time complexity
// O(m * n) space complexity
// Patterns: Matrix BFS
/**
 * @param {number[][]} maze
 * @param {number[]} ball
 * @param {number[]} hole
 * @return {string}
 */
var findShortestWay = function (maze, ball, hole) {
  const WALL = 1;
  const DIRS = { 'd': [1, 0], 'l': [0, -1], 'r': [0, 1], 'u': [-1, 0] };

  function getNextKicks(cell, nextKicks, path) {
    const deltaPrev = getDeltaPrev(path);
    if (path && canMove(cell, deltaPrev)) {
      nextKicks.push([
        [cell[0] + deltaPrev[0], cell[1] + deltaPrev[1]],
        path
      ]);
    } else {
      for (const [dir, delta] of Object.entries(DIRS)) {
        if (canMove(cell, delta)) {
          nextKicks.push([
            [cell[0] + delta[0], cell[1] + delta[1]],
            path + dir
          ]);
        }
      }
    }
  }

  function getDeltaPrev(path) {
    const dirPrev = path[path.length - 1] ?? '';

    return DIRS[dirPrev] ?? null;
  }

  function canMove(cell, delta) {
    if (delta === null) {
      return false;
    }

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
    return cell[0] === hole[0] && cell[1] === hole[1];
  }

  const visited = {};

  let kicks = [[ball, '']];
  while (kicks.length) {

    const nextKicks = [];
    for (const [kick, path] of kicks) {
      const deltaPrev = getDeltaPrev(path);
      if (path === '' || !canMove(kick, deltaPrev)) {
        if (visited[kick]) {
          continue;
        }
        visited[kick] = true;
      }

      if (hitsHole(kick)) {
        return path;
      }

      getNextKicks(kick, nextKicks, path);
    }
    kicks = nextKicks;
  }

  return 'impossible';
};

// O(m * n * log (m * n)) time complexity
// O(m * n) space complexity
// Patterns: Matrix BFS, Dijkstra's
/**
 * @param {number[][]} maze
 * @param {number[]} ball
 * @param {number[]} hole
 * @return {string}
 */
var findShortestWay = function (maze, ball, hole) {
  const WALL = 1;
  const DIRS = { 'd': [1, 0], 'l': [0, -1], 'r': [0, 1], 'u': [-1, 0] };

  function hitsHole(coord) {
    return coord[0] === hole[0] && coord[1] === hole[1];
  }

  function canMove(coord, delt) {
    const nextRow = coord[0] + delt[0];
    const nextCol = coord[1] + delt[1];

    return isInBounds(nextRow, nextCol) && maze[nextRow][nextCol] !== WALL;
  }

  function isInBounds(row, col) {
    return 0 <= row && row < maze.length
      && 0 <= col && col < maze[0].length;
  }

  function getAdj(row, col) {
    const adj = [];

    for (const [dir, deltas] of Object.entries(DIRS)) {
      let rowCurr = row;
      let colCurr = col;
      let dist = 0;
      while (canMove([rowCurr, colCurr], deltas)) {
        rowCurr += deltas[0];
        colCurr += deltas[1];
        dist++;

        if (hitsHole([rowCurr, colCurr])) {
          break;
        }
      }

      if (dist) {
        adj.push(new State(rowCurr, colCurr, dist, dir));
      }
    }

    return adj;
  }

  const pq = new PriorityQueue(
    (a, b) => (a.dist === b.dist) ? a.path.charCodeAt() - b.path.charCodeAt() : a.dist - b.dist
  );

  const seen = {};
  pq.enqueue(new State(...ball));

  while (pq.size()) {
    const { row, col, dist, path } = pq.dequeue();

    if (seen[[row, col]]) {
      continue;
    }
    seen[[row, col]] = true;

    if (hitsHole([row, col])) {
      return path;
    }

    for (const nextState of getAdj(row, col)) {
      pq.enqueue(new State(
        nextState.row,
        nextState.col,
        dist + nextState.dist,
        path + nextState.path
      ));
    }
  }

  return 'impossible';
};

class State {
  constructor(row, col, dist = 0, path = '') {
    this.row = row;
    this.col = col;
    this.dist = dist;
    this.path = path;
  }
}