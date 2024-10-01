// 2024/10/01
// O(1) time complexity
// O(1) space complexity
// Time to complete: 27:01 min
// Patterns: stack, doubly-linked list
// Notes w.r.t. solution: Finished in 11:23 but spent rest of time on careless mistakes. Oops!
//    Like return val instead of node, compare to node val rather than node.
class Node {
  constructor(val, next, prev) {
    this.val = val;
    this.next = next ?? null;
    this.prev = prev ?? null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;

      this.tail = node;
    }
  }

  pop() {
    const node = this.tail;

    if (node) {
      this.tail = node.prev;
      node.prev = null;
      if (this.tail) {
        this.tail.next = null;

        if (this.tail.prev === null) {
          this.head = this.tail;
        }
      } else {
        this.head = null;
      }
    }

    return node;
  }
}

var MinStack = function () {
  this.values = new LinkedList();
  this.mins = new LinkedList();;
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function (val) {
  this.values.push(val);

  const node = this.mins.tail;
  const minPrev = (node === null || val < node.val) ? val : node.val;
  this.mins.push(minPrev);
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
  this.mins.pop();
  return this.values.pop()?.val;
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
  return this.values.tail?.val;
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
  return this.mins.tail?.val;
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/


// 2023 - Refactored
// O(1) time complexity
// O(1) space complexity
// Time to complete: 27 min (base) + 12 min (refactoring)
// Patterns: stack, doubly-linked list
// Notes w.r.t. solution: This time took longer because rather than implementing pre-made 'stack' objects,
//    I decided as an exercise to implement the structure using lower level objects.
// Refactoring involved making linked list structures to avoid repeating code for adding/removing nodes.
class Node {
  constructor(value, next = null, prev = null) {
    this.val = value;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(node) {
    if (this.head) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
  }

  removeTail() {
    if (!this.head) {
      return undefined;
    }

    const node = this.tail;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head.next = null;
      this.head = null;
    }
    node.prev = null;

    return node;
  }
}

var MinStack = function () {
  this.values = new LinkedList();
  this.minValues = new LinkedList();
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function (val) {
  const node = new Node(val);
  this.values.addToTail(node);

  const minNode = this.minValues.tail
    ? new Node(Math.min(this.minValues.tail.val, val))
    : new Node(val);
  this.minValues.addToTail(minNode);
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
  this.minValues.removeTail();
  return this.values.removeTail();
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
  return this.values.tail ? this.values.tail.val : undefined;
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
  return this.minValues.tail ? this.minValues.tail.val : undefined;
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/

// 2023
// O(1) time complexity
// O(1) space complexity
// Time to complete: 27 min
// Patterns: stack, doubly-linked list
// Notes w.r.t. solution: This time took longer because rather than implementing pre-made 'stack' objects,
//    I decided as an exercise to implement the structure using lower level objects.
class Node {
  constructor(value, next = null, prev = null) {
    this.val = value;
    this.next = next;
    this.prev = prev;
  }
}

var MinStack = function () {
  this.head = null;
  this.tail = null;
  this.minHead = null;
  this.minTail = null;
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function (val) {
  if (this.head) {
    const node = new Node(val);
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;

    const minNode = new Node(Math.min(this.minTail.val, node.val));
    minNode.prev = this.minTail;
    this.minTail.next = minNode;
    this.minTail = minNode;
  } else {
    const node = new Node(val);
    this.head = node;
    this.tail = node;

    const minNode = new Node(val);
    this.minHead = minNode;
    this.minTail = minNode;
  }
};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
  if (!this.head) {
    return undefined;
  }

  const node = this.tail;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head.next = null;
    this.head = null;
  }
  node.prev = null;

  const nodeMin = this.minTail;
  this.minTail = this.minTail.prev;
  if (this.minTail) {
    this.minTail.next = null;
  } else {
    this.minHead.next = null;
    this.minHead = null;
  }
  nodeMin.prev = null;

  return node.val;
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
  return this.tail ? this.tail.val : undefined;
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
  return this.minTail ? this.minTail.val : undefined;
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/

// 2022
// O(1) time complexity
// O(1) space complexity
// Time to complete: 15:05
// Patterns: stack
// Notes w.r.t. solution:

var MinStack = function () {
  this.values = [];
  this.minValues = [];
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function (val) {
  let currentMin = this.minValues.length === 0
    ? val
    : this.getMin();
  let newMin = val < currentMin ? val : currentMin;
  this.minValues.push(newMin);

  this.values.push(val);

};

/**
* @return {void}
*/
MinStack.prototype.pop = function () {
  this.minValues.pop();
  return this.values.pop();
};

/**
* @return {number}
*/
MinStack.prototype.top = function () {
  return this.values[this.values.length - 1];
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function () {
  return this.minValues[this.minValues.length - 1];
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/