// 2024/12/06
// O(n * log(k)) time complexity (for sort)
// O(n + k) space complexity  (for count hashmap (n) & heap (k))
// Time to complete: 11:03 min
// Patterns: Priority Queue/Heap
// Notes w.r.t. solution: Used pre-made PQ. All variations pass.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const frequencies = {};
  for (const num of nums) {
    if (!frequencies[num]) {
      frequencies[num] = 0;
    }
    frequencies[num]++;
  }

  const queue = new MyPriorityQueue((a, b) => a[1] - b[1]);

  for (const [num, count] of Object.entries(frequencies)) {
    queue.enqueue([Number(num), count]);

    if (queue.size() > k) {
      queue.dequeue();
    }
  }

  let topKNums = [];
  while (queue.size()) {
    topKNums.push(queue.dequeue()[0]);
  }

  return topKNums;
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

// 2024/05/05
// O(m + n) time complexity (for sort)
// O(n) space complexity  (for count hashmap)
// Time to complete: N/A min
// Patterns: Bucket Sort
// Notes w.r.t. solution: Reworked problem integrating bucket sort. Made alteration to allow sorting on sub-element.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  })

  let countsKeys = Object.entries(counts);
  countsKeys = bucketSort(countsKeys, (a) => a[1]);

  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(countsKeys[countsKeys.length - 1 - i][0])
    i++;
  }

  return topKs;
};

var bucketSort = function (nums, getVal = null) {
  if (!getVal) {
    getVal = (a) => a;
  }

  // Establish ranges, break if no sorting needed
  let min = getVal(nums[0]);
  let max = getVal(nums[0]);
  nums.forEach((num) => {
    const val = getVal(num)
    min = Math.min(min, val);
    max = Math.max(max, val);
  });

  if (min === max) {
    return nums;
  }

  // Create & fill buckets
  const numBuckets = 10;    // Reasonable guess, post-sorting still needed
  const buckets = Array(numBuckets).fill(0).map(() => []);

  nums.forEach((num) => {
    const idx = Math.floor((getVal(num) - min) * (buckets.length - 1) / (max - min));
    buckets[idx].push(num);
  });

  // Merge buckets
  let ptr = 0;
  for (const vals of Object.values(buckets)) {
    let valsLength = vals.length;
    while (valsLength) {
      nums[ptr] = vals[vals.length - valsLength];
      ptr++;
      valsLength--;
    }
  }

  // Sort result for mildly disordered list
  nums.sort((a, b) => getVal(a) - getVal(b));

  return nums;
};

// 2024/04/29
// O(n * log(n)) time complexity (for sort)
// O(n) space complexity  (for count hashmap)
// Time to complete: 5:05 min
// Patterns: Heap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  });

  const maxHeap = new MaxHeap(Object.entries(counts), (child, parent) => child[1] > parent[1]);

  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(maxHeap.remove()[0]);
    i++;
  }

  return topKs;
};

class MaxHeap {
  size = 0;
  items = [];
  comparator = (child, parent) => a > b;

  constructor(items = [], comparator = null) {
    if (comparator) {
      this.comparator = comparator;
    }

    if (Array.isArray(items)) {
      this.items = [...items];
    } else {
      this.items = [items];
    }
    this.size = this.items.length;

    const lastParentIndex = Math.floor(this.size / 2) - 1;

    for (let i = lastParentIndex; 0 <= i; i--) {
      this.heapifyDown(i);
    }
  }

  insert(score) {
    const targetIndex = this.items.push(score) - 1;
    this.size++;

    this.heapifyUp(targetIndex);

    return this.size;
  }

  remove() {
    let val = this.items[0];

    this.swap(0, this.size - 1);
    this.size--;
    this.heapifyDown(0);

    return val;
  }

  heapifyDown(startIndex = this.size - 1) {
    let targetIndex = Math.min(Math.max(0, startIndex), this.size - 1);

    while (targetIndex < this.size - 1) {
      let swapIndex = targetIndex;
      swapIndex = this.considerChildSwap(swapIndex, 1, targetIndex);
      swapIndex = this.considerChildSwap(swapIndex, 2, targetIndex);

      if (swapIndex === targetIndex) {
        break;
      } else {
        this.swap(targetIndex, swapIndex);
        targetIndex = swapIndex;
      }
    }
  }

  considerChildSwap(swapIndex, childNumber, targetIndex) {
    const childIndex = 2 * targetIndex + childNumber;

    return (childIndex <= this.size - 1 && this.shouldSwap(childIndex, swapIndex))
      ? childIndex
      : swapIndex;
  }

  heapifyUp(startIndex = this.size - 1) {
    let targetIndex = Math.min(Math.max(0, startIndex), this.size - 1);
    let parentIndex = this.getParentIndex(targetIndex);

    while (parentIndex >= 0 && this.shouldSwap(targetIndex, parentIndex)) {
      this.swap(targetIndex, parentIndex);

      targetIndex = parentIndex;
      parentIndex = this.getParentIndex(targetIndex);
    }
  }

  shouldSwap(indexChild, indexParent) {
    return this.comparator(this.items[indexChild], this.items[indexParent]);
  }

  swap(i, j) {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
}

// 2024/04/04
// O(n * log(n)) time complexity (for sort)
// O(n) space complexity (for sort)
// Time to complete: 12:20 min
// Patterns: Hash Map, Sorting Algorithms
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const counts = {};
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num]++;
    }
  })

  const countsKeys = Object.entries(counts);
  countsKeys.sort((a, b) => a[1] - b[1]);


  const topKs = [];
  let i = 0;
  while (i < k) {
    topKs.push(countsKeys[countsKeys.length - 1 - i][0])
    i++;
  }

  return topKs;
};