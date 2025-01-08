// 2025/01/08
// O(n * log(max - min)) time complexity
// O(n * log(max - min)) space complexity
// Time to complete: NA min
// Patterns: Binary Search
// Notes w.r.t. solution: Implemented LeetCode solution.
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  const smallest = matrix[0][0];
  const largest = matrix[matrix.length - 1][matrix[0].length - 1];

  let start = smallest;
  let end = largest;
  while (start < end) {
    const mid = start + Math.floor((end - start) / 2);
    const { count, largestSmall, smallestLarge } = countLessEqual(matrix, mid, smallest, largest);

    if (count === k) {
      return largestSmall;
    }

    if (count < k) {
      start = smallestLarge;
    } else {
      end = largestSmall;
    }
  }

  return start;
};

function countLessEqual(matrix, mid, smallest, largest) {
  let largestSmall = smallest;
  let smallestLarge = largest;

  let count = 0;
  let row = matrix.length - 1;
  let col = 0;
  while (row >= 0 && col < matrix[0].length) {
    const value = matrix[row][col];
    if (value > mid) {
      smallestLarge = Math.min(smallestLarge, value);
      row--;
    } else {
      largestSmall = Math.max(largestSmall, value);
      col++;

      count += row + 1;
    }
  }

  return { count, largestSmall, smallestLarge };
}

// 2024/12/07
// O(x + k * log(x)) time complexity
// O(x) space complexity
//  where x = min(k, #rows)
// Time to complete: NA min
// Patterns: Priority Queue/MinHeap
// Notes w.r.t. solution: Implemented LeetCode solution.
//  Time complexity is faster, but actually runs slower than my MaxHeap solution...
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  // Element = [value, row, col]
  const queue = new MyPriorityQueue((a, b) => a[0] - b[0]);
  const n = matrix.length;
  const x = Math.min(n, k);

  for (let row = 0; row < x; row++) {
    queue.enqueue([matrix[row][0], row, 0]);
  }

  let element = queue.peek();
  while (k > 0) {
    k--;
    element = queue.dequeue();
    const [, row, col] = element;

    if (col < n - 1) {
      queue.enqueue([matrix[row][col + 1], row, col + 1]);
    }
  }

  return element[0];
};

// 2024/12/07
// O(n^2 * log(k)) time complexity
// O(k) space complexity
// Time to complete: NA min
// Patterns: Priority Queue/MaxHeap
// Notes w.r.t. solution: Optimized prior solution with early termination.
//  Faster, but not in a consequential to time-space way.
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  const queue = new MyPriorityQueue((a, b) => b - a);

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const item = matrix[row][col];

      if (queue.size() < k) {
        queue.enqueue(item);
      } else {                      // Reached k elements
        if (item < queue.peek()) {  // Add while maintaining min k elements
          queue.dequeue();
          queue.enqueue(item);
        } else if (matrix[row + 1] && matrix[row + 1][0] < queue.peek()) {
          break;                    // Continue to next row as next item is smaller
        } else {
          return queue.dequeue();   // Early exit
        }
      }
    }
  }

  return queue.dequeue();
};

// 2024/12/07
// O(n^2 * log(k)) time complexity
// O(k) space complexity
// Time to complete: 6:02 min
// Patterns: Priority Queue/MaxHeap
// Notes w.r.t. solution: Used pre-made priority queue. Array had TLE, but LL worked.
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  const queue = new MyPriorityQueue((a, b) => b - a);

  for (const row of matrix) {
    for (const item of row) {
      queue.enqueue(item);

      if (queue.size() > k) { // Maintain k elements
        queue.dequeue();
      }
    }
  }

  return queue.dequeue();
};

class MyPriorityQueue {
  constructor(comparator, nums) {
    // this.queue = new ArrayQueue(comparator, nums);
    // this.queue = new LinkedList(comparator, nums);
    this.queue = new Heap(comparator, nums);
  }

  size() {
    return this.queue.size();
  }

  peek() {
    return this.queue.peek();
  }

  enqueue(item) {
    this.queue.insert(item);
  }

  dequeue() {
    return this.queue.removeRoot();
  }
}

class ArrayQueue {
  constructor(comparator, nums) {
    this.comparator = comparator;
    this.items = nums ?? [];
    this.isDirty = !!this.items.length;
  }

  peek() {
    this.sortIfDirty();
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  insert(item) {
    this.items.push(item);
    this.isDirty = true;
  }

  removeRoot() {
    this.sortIfDirty();
    return this.items.pop();
  }

  sortIfDirty() {
    if (this.isDirty) {
      this.items.sort((a, b) => -1 * this.comparator(a, b));
      this.isDirty = false;
    }
  }
}

class LinkedList {
  constructor(comparator, nums) {
    this.comparator = comparator;
    this.head = null;
    this.length = 0;

    if (nums?.length) {
      for (let i = 0; i < nums.length; i++) {
        this.insert(nums[i]);
      }
    }
  }

  peek() {
    return this.head?.val;
  }

  size() {
    return this.length;
  }

  removeRoot() {
    if (!this.head) {
      return null;
    }

    const node = this.head;
    this.head = this.head.next;

    this.length--;

    return node.val;
  }

  insert(item) {
    const node = new Node(item);
    if (!this.head || this.comparator(item, this.head.val) <= 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let currNode = this.head;
      while (currNode.next && this.comparator(item, currNode.next.val) > 0) {
        currNode = currNode.next;
      }

      node.next = currNode.next;
      currNode.next = node;
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
      if (!this.shouldSwap(this.nums[0], val)) {
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