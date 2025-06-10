// 2025/06/10
// O(1) time complexity
// O(n) space complexity
// Time to complete: 20:10 min
// Patterns: Queue, LinkedList, Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 */
var FirstUnique = function (nums) {
  // first is by lowest index
  // unique is by count
  this.queue = new LinkedListDouble();
  this.nums = {};
  for (const num of nums) {
    this.add(num);
  }
};

/**
* @return {number}
*/
FirstUnique.prototype.showFirstUnique = function () {
  return this.queue.front();
};

/**
* @param {number} value
* @return {void}
*/
FirstUnique.prototype.add = function (value) {
  if (value in this.nums) {
    // remove val from queue
    this.queue.remove(this.nums[value]);
  } else {
    // add val to queue
    const node = this.queue.enqueue(value);
    this.nums[value] = node;
  }
};

class LinkedListDouble {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  front() {
    return this.head ? this.head.val : -1;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;

      this.tail = node;
    }

    return this.tail;
  }

  remove(node) {
    if (this.head === node) {
      this.head = node.next;
    }

    if (this.tail === node) {
      this.tail = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    node.next = null;
    node.prev = null;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/**
* Your FirstUnique object will be instantiated and called as such:
* var obj = new FirstUnique(nums)
* var param_1 = obj.showFirstUnique()
* obj.add(value)
*/