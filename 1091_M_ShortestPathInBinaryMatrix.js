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