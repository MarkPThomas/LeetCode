// 2025/01/31
// O(n/2) time complexity
// O(n/2) space complexity
// Time to complete: 32:53
// Patterns: BFS Bi-directional
// Notes w.r.t. solution: Went OT on some dumb bugs. Tips:
//  1. Collect coords into coord variable to avoid mistakes in referencing in grid & visited
//  2. Keep neighbors addition simple - only check in-bounds, not visited & is valid tile.
//    Keep marking of visited & checking intersections outside, for current tile, before adding it's neighbors.
var shortestPathBinaryMatrix = function (grid) {
  const start = [0, 0];
  const end = [grid.length - 1, grid[0].length - 1];
  if (grid[start[0]][start[1]] === 1 || grid[end[0]][end[1]] === 1) {
    return -1;
  }

  const DIRS = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

  function processQueue(queue, visited, visitedOther, nextQueue) {
    for (let i = 0; i < queue.length; i++) {
      const [coord, dist] = queue[i];

      // Check intersection of other path
      if (visitedOther[coord]) {
        return dist + visitedOther[coord] - 1;
      }

      if (visited[coord]) {
        continue;
      }
      visited[coord] = dist;

      for (const [deltaRow, deltaCol] of DIRS) {
        const nextRow = coord[0] + deltaRow;
        const nextCol = coord[1] + deltaCol;

        // Check in-bounds
        if (nextRow < 0 || grid.length <= nextRow
          || nextCol < 0 || grid[0].length <= nextCol) {
          continue;
        }

        // Add if valid
        const nextCoord = [nextRow, nextCol];
        if (grid[nextCoord[0]][nextCoord[1]] === 0 && !visited[nextCoord]) {
          nextQueue.push([nextCoord, dist + 1]);
        }
      }
    }
  }

  let queueStart = [[start, 1]];
  const visitedStart = {};

  let queueEnd = [[end, 1]]
  const visitedEnd = {};

  while (queueStart.length || queueEnd.length) {
    const nextQueueStart = [];
    const startDist = processQueue(queueStart, visitedStart, visitedEnd, nextQueueStart);
    if (startDist) {
      return startDist;
    }
    queueStart = nextQueueStart;

    const nextQueueEnd = [];
    const endDist = processQueue(queueEnd, visitedEnd, visitedStart, nextQueueEnd);
    if (endDist) {
      return endDist;
    }
    queueEnd = nextQueueEnd;
  }

  return -1;
};

// 2024/10/18
// O(n/2) time complexity
// O(n/2) space complexity
// Time to complete: Over Time
// Patterns: BFS Bi-directional
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, 1], [1, -1]
  ];

  function checkAllNeighbors(queue, visited, visitedOther, queueTemp) {
    while (queue.length) {
      let [coord, length] = queue.shift();

      if (visited[coord]) {
        continue;
      }
      visited[coord] = length;

      if (visitedOther[coord]) {
        return visitedOther[coord] + length - 1;
      }

      length++;
      for (const direction of directions) {
        const row = coord[0] + direction[0];
        const col = coord[1] + direction[1];

        if (row < 0 || grid.length <= row
          || col < 0 || grid[0].length <= col) {
          continue;
        }

        const nextCoord = [row, col];
        if (grid[row][col] === 0 && !visited[nextCoord]) {
          queueTemp.push([nextCoord, length]);
        }
      }
    }
  }

  const start = [0, 0];
  const end = [grid.length - 1, grid[0].length - 1];
  if (grid[start[0]][start[1]] !== 0 || grid[end[0]][end[1]] !== 0) {
    return -1;
  }

  let queue1 = [[start, 1]];
  const visited1 = {};

  let queue2 = [[end, 1]];
  const visited2 = {};

  while (queue1.length && queue2.length) {
    let queue1Next = [];
    const lengthStart = checkAllNeighbors(queue1, visited1, visited2, queue1Next);
    if (lengthStart) {
      return lengthStart;
    }
    queue1 = queue1Next;

    let queue2Next = [];
    const lengthEnd = checkAllNeighbors(queue2, visited2, visited1, queue2Next);
    if (lengthEnd) {
      return lengthEnd;
    }
    queue2 = queue2Next;
  }

  return -1;
};

// 2024/10/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: Over Time
// Patterns: BFS
// Notes w.r.t. solution:
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, 1], [1, -1]
  ];

  const start = [0, 0];
  const end = [grid.length - 1, grid[0].length - 1];
  if (grid[start[0]][start[1]] !== 0 || grid[end[0]][end[1]] !== 0) {
    return -1;
  }

  const queue = [[start, 1]];
  const visited = {};
  while (queue.length) {
    const [coord, length] = queue.shift();

    if (coord[0] === end[0] && coord[1] === end[1]) {
      return length;
    }

    if (visited[coord]) {
      continue;
    }
    visited[coord] = length;

    for (const direction of directions) {
      const row = coord[0] + direction[0];
      const col = coord[1] + direction[1];
      if (row < 0 || grid.length <= row
        || col < 0 || grid[0].length <= col) {
        continue;
      }

      const nextCoord = [row, col];
      if (grid[row][col] === 0 && !visited[nextCoord]) {
        queue.push([nextCoord, length + 1]);
      }
    }
  }

  return -1;
};

class QueueLL {
  constructor(val) {
    this.length = 0;

    if (val) {
      this.push(val);
    }
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  shift() {
    if (!this.head) {
      return;
    }

    const node = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = this.head;
    }
    this.length--;

    return node.val;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}