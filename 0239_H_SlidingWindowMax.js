// 2025/02/02
// O(n) time complexity
// O(k) space complexity
// Time to complete: NA min
// Patterns: Monontonic Queue
// Notes w.r.t. solution: Worked solution w/ Deque
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const maxVals = [];
  const mq = new Deque();

  for (let i = 0; i < nums.length; i++) {
    if (mq.front() <= i - k) {
      mq.popFront();
    }

    while (mq.size() && nums[i] > nums[mq.back()]) {
      mq.popBack();
    }
    mq.pushBack(i);

    if (i >= k - 1) {
      maxVals.push(nums[mq.front()]);
    }
  }

  return maxVals;
};


// 2025/02/02
// O(n) time complexity
// O(k) space complexity
// Time to complete: NA min
// Patterns: Monontonic Queue
// Notes w.r.t. solution: Worked solution w/ Linked List queue
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const maxVals = [];
  const mq = new MyQueue();

  for (let i = 0; i < nums.length; i++) {
    if (mq.first() <= i - k) {
      mq.shift();
    }

    while (mq.length && nums[i] > nums[mq.last()]) {
      mq.pop();
    }
    mq.push(i);

    if (i >= k - 1) {
      maxVals.push(nums[mq.first()]);
    }
  }

  return maxVals;
};

class MyQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  first() {
    return this.head?.val;
  }

  last() {
    return this.tail?.val;
  }

  push(val) {
    const node = new Node(val);
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;

      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.length++;
  }

  pop() {
    if (this.tail) {
      const node = this.tail;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }

      this.length--;
      return node.val;
    } else {
      return null;
    }
  }

  shift() {
    if (this.head) {
      const node = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }

      this.length--;
      return node.val;
    } else {
      return null;
    }
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

// 2025/02/02
// O(n * k) time complexity
// O(k) space complexity
// Time to complete: NA min
// Patterns: Monontonic Queue
// Notes w.r.t. solution: Worked solution w/ array queue
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const maxVals = [];
  const mq = [];

  for (let i = 0; i < nums.length; i++) {
    if (mq[0] === i - k) {
      mq.shift();
    }

    while (mq.length && nums[i] > nums[mq[mq.length - 1]]) {
      mq.pop();
    }
    mq.push(i);

    if (i >= k - 1) {
      maxVals.push(nums[mq[0]]);
    }
  }

  return maxVals;
};

// 2025/02/02
// O(n * log(k)) time complexity
// O(k) space complexity
// Time to complete: 9:28 min
// Patterns: Priority Queue
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const maxVals = [];
  const maxHeap = new PriorityQueue({ compare: (a, b) => b[0] - a[0] });

  for (let i = 0; i < nums.length; i++) {
    maxHeap.enqueue([nums[i], i]);
    if (i < k - 1) {
      continue;
    }

    maxVals.push(maxHeap.front()[0]);
    while (maxHeap.size() && maxHeap.front()[1] <= i - k + 1) {
      maxHeap.dequeue();
    }
  }

  return maxVals;
};