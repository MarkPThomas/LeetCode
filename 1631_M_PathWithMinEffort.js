// 2024/12/09
// O(m * n * log(m * n)) time complexity
// O(m * n) space complexity
// Time to complete: xx min
// Patterns: Shortest Path - SPFA
// Notes w.r.t. solution:
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const DIRS = [[0, -1], [0, 1], [1, 0], [-1, 0]];

  const minDiffs = Array(heights.length).fill().map(() => Array(heights[0].length).fill(Infinity));
  minDiffs[0][0] = 0;

  const queue = [[0, 0]];
  while (queue.length) {
    adjCount = queue.length;
    while (adjCount) {
      adjCount--;

      const [currRow, currCol] = queue.shift();

      for (const [rowDelt, colDelt] of DIRS) {
        const adjRow = currRow + rowDelt;
        const adjCol = currCol + colDelt;

        if (adjRow < 0 || heights.length <= adjRow
          || adjCol < 0 || heights[0].length <= adjCol) {
          continue;
        }

        const currDiff = Math.abs(heights[adjRow][adjCol] - heights[currRow][currCol]);
        const maxDiff = Math.max(currDiff, minDiffs[currRow][currCol]);

        if (minDiffs[adjRow][adjCol] > maxDiff) {
          minDiffs[adjRow][adjCol] = maxDiff;
          queue.push([adjRow, adjCol, maxDiff]);
        }
      }

    }
  }

  return minDiffs[minDiffs.length - 1][minDiffs[0].length - 1];
}

// 2024/11/25
// O(m * n * log(m * n)) time complexity
// O(m * n) space complexity
// Time to complete:
// Patterns: Disjoint Set - Union Find
// Notes w.r.t. solution: Example worked through for notes
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;

  if (rows === 1 && cols === 1) {
    return 0;
  }

  const dsu = new DSU(heights);

  const edges = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = dsu.get1DIndex(row, col);

      if (row > 0) {
        const nextRow = row - 1;
        const diffRow = Math.abs(heights[row][col] - heights[nextRow][col]);
        const edge = new Edge(index, dsu.get1DIndex(nextRow, col), diffRow);
        edges.push(edge);
      }

      if (col > 0) {
        const nextCol = col - 1;
        const diffCol = Math.abs(heights[row][col] - heights[row][nextCol]);
        const edge = new Edge(index, dsu.get1DIndex(row, nextCol), diffCol);
        edges.push(edge);
      }
    }
  }
  edges.sort((a, b) => a.diff - b.diff);

  for (const { x, y, diff } of edges) {
    dsu.union(x, y);

    if (dsu.find(0) === dsu.find(rows * cols - 1)) {
      return diff;
    }
  }

  return -1;
};

class DSU {
  constructor(heights) {
    this.roots = [];
    this.ranks = [];

    const rows = heights.length;
    this.cols = heights[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const index = this.get1DIndex(row, col);
        this.roots.push(index);
        this.ranks.push(1);
      }
    }
  }

  get1DIndex(row, col, cols) {
    return row * this.cols + col;
  }

  find(x) {
    if (this.roots[x] !== x) {
      this.roots[x] = this.find(this.roots[x]);
    }

    return this.roots[x];
  }

  union(child, parent) {
    let childRoot = this.find(child);
    let parentRoot = this.find(parent);

    if (childRoot !== parentRoot) {
      if (this.ranks[childRoot] > this.ranks[parentRoot]) {
        const swap = childRoot;
        childRoot = parentRoot;
        parentRoot = swap;
      }

      this.roots[childRoot] = parentRoot;
      this.ranks[parentRoot] += this.ranks[childRoot];
    }

  }
}

class Edge {
  constructor(x, y, difference) {
    this.x = x;
    this.y = y;
    this.diff = difference;
  }
}

// 2024/11/25
// O(m * n * log(m * n)) time complexity
// O(m * n) space complexity
// Time to complete: 38:55 min, TLE until priority queue
// Patterns: Shortest Path - Dijkstra's
// Notes w.r.t. solution: Mostly solved in 28:00
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const rows = heights.length;
  const cols = heights[0].length;

  const visited = Array(rows).fill().map(() => Array(cols));
  const minDiffs = Array(rows).fill().map(() => Array(cols).fill(Infinity));
  minDiffs[0][0] = 0;

  const queue = new MyPriorityQueue((a, b) => a[2] - b[2]);  // a.diff - b.diff
  queue.enqueue([0, 0, 0]);

  while (queue.size()) {
    const [currRow, currCol, currDiff] = queue.dequeue();
    visited[currRow][currCol] = true;

    if (currRow === rows - 1 && currCol === cols - 1) {
      return currDiff;
    }

    for (const [rowDelt, colDelt] of DIRS) {
      const adjRow = currRow + rowDelt;
      const adjCol = currCol + colDelt;

      if (adjRow < 0 || heights.length <= adjRow
        || adjCol < 0 || heights[0].length <= adjCol
        || visited[adjRow][adjCol]) {
        continue;
      }

      const currDiff = Math.abs(heights[adjRow][adjCol] - heights[currRow][currCol]);
      const maxDiff = Math.max(currDiff, minDiffs[currRow][currCol]);

      if (minDiffs[adjRow][adjCol] > maxDiff) {
        minDiffs[adjRow][adjCol] = maxDiff;
        queue.enqueue([adjRow, adjCol, maxDiff]);
      }
    }
  }
};

class MyPriorityQueue {
  constructor(comparator) {
    // this.queue = new ArrayQueue(comparator);
    // this.queue = new LinkedList(comparator);
    this.queue = new Heap(comparator);
  }

  size() {
    return this.queue.size();
  }

  enqueue(item) {
    this.queue.insert(item);
  }

  dequeue(item) {
    return this.queue.removeRoot();
  }
}

class ArrayQueue {
  constructor(comparator) {
    this.comparator = comparator;
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  insert(item) {
    this.items.push(item);
  }

  removeRoot() {
    this.items.sort((a, b) => -1 * this.comparator(a, b));
    return this.items.pop();
  }
}

class LinkedList {
  constructor(comparator) {
    this.comparator = comparator;
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  removeRoot() {
    if (!this.head) {
      return null;
    }

    const node = this.head;
    if (!node.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = node.next;
      if (this.head) {
        this.head.prev = null;
      }

      if (node === this.tail) {
        this.tail.prev = null;
      }

      node.next = null;
    }

    this.length--;

    return node.val;
  }

  insert(item) {
    let node = this.head;
    while (node) {
      if (this.comparator(item, node.val) <= 0) {
        break;
      } else {
        node = node.next;
      }
    }

    this.insertBefore(item, node);
  }

  insertBefore(item, nextNode) {
    const node = new Node(item);

    if (!this.head) {
      // empty
      this.head = node;
      this.tail = this.head;
    } else if (!nextNode) {
      // at tail
      node.prev = this.tail;
      this.tail.next = node;

      this.tail = node;
    } else {
      // in between nodes, or at beginning
      const prevNode = nextNode.prev;
      if (!prevNode) {
        // at head
        node.next = this.head;
        this.head.prev = node;

        this.head = node;
      } else {
        // in between nodes
        node.prev = prevNode;
        node.next = nextNode;

        prevNode.next = node;
        nextNode.prev = node;
      }
    }
    this.length++;
  }
}

class Node {
  constructor(val, prev, next) {
    this.val = val;
    this.prev = prev ?? null;
    this.next = next ?? null;
  }
}

class Heap {
  constructor(comparator, nums) {
    this.comparator = comparator;
    this.nums = nums ?? [];
    this.build();
  }

  size() {
    return this.nums.length;
  }

  build() {
    for (let i = Math.floor(this.nums.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  peek() {
    return this.nums[0];
  }

  insert(val) {
    if (this.nums.length === this.sizeLimit) {
      if (this.nums[0] > val) {
        return;
      } else {
        this.nums[0] = val;
        this.heapifyDown(0);
      }
    } else {
      this.nums.push(val);
      this.heapifyUp(this.nums.length - 1);
    }
  }

  removeRoot() {
    this.swap(0, this.nums.length - 1);
    const item = this.nums.pop();

    this.heapifyDown(0);

    return item;
  }

  heapifyUp(targetIndex) {
    while (targetIndex) {
      const parentIndex = this.getParentIndex(targetIndex);
      if (this.shouldSwap(targetIndex, parentIndex)) {
        this.swap(targetIndex, parentIndex);
        targetIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(targetIndex) {
    while (targetIndex < this.nums.length) {
      let swapIndex = targetIndex;
      swapIndex = this.getSwapIndex(1, targetIndex, swapIndex);
      swapIndex = this.getSwapIndex(2, targetIndex, swapIndex);

      if (swapIndex === targetIndex) {
        break;
      }

      this.swap(swapIndex, targetIndex);
      targetIndex = swapIndex;
    }
  }

  getSwapIndex(childNum, targetIndex, swapIndex) {
    const childIdx = targetIndex * 2 + childNum;

    return childIdx < this.nums.length
      && this.shouldSwap(childIdx, swapIndex) ? childIdx : swapIndex;
  }

  shouldSwap(childIdx, parentIdx) {
    return this.comparator(this.nums[childIdx], this.nums[parentIdx]) <= 0;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    const temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
}