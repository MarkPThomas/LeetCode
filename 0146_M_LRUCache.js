// 2025/03/11
// Constructor
//   O(1) time complexity
//   O(1) space complexity
// Get
//   O(1) time complexity
//   O(1) space complexity
// Put
//   O(1) time complexity
//   O(1) space complexity
// Time to complete: 32:09 min
// Patterns: Linked List
// Notes w.r.t. solution: Solved in 18:24 but had small bugs to work out. Slow down & be careful!
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.size = 0;

  this.keys = {};
  this.values = new LLinkedList();
};

/**
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  const node = this.keys[key];

  if (!node) {
    return -1;
  }

  this.values.moveToHead(node);
  return node.val;
};

/**
* @param {number} key
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  if (this.keys[key]) {
    // update
    const node = this.keys[key];
    node.val = value;

    this.values.moveToHead(node);
  } else {
    // add
    const node = new LLNode(key, value);
    this.values.prepend(node);
    this.keys[node.key] = node;

    this.size++;
    if (this.size > this.capacity) {
      const lfuNode = this.values.popTail();
      delete this.keys[lfuNode.key];
      this.size--;
    }
  }
};

class LLNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  moveToHead(node) {
    if (this.head === this.tail) {
      return;
    }
    this.remove(node);
    this.prepend(node);
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

    node.prev = null;
    node.next = null;

    return node;
  }

  prepend(node) {
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
  }

  popTail() {
    const node = this.tail;

    this.tail = node.prev;

    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }

    node.prev = null;

    return node;
  }
}

/**
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/