// 2024/03/29
// O(n) -> O(1) time complexity
// O(n) -> O(1)  space complexity
// where n = # of calls within the last 3000 ms = constant since t: int
// Time to complete: 8:00 min for array var, 5:40 min for linked list var
// Patterns: Queue, Array, LinkedList
// Notes w.r.t. solution:

// === Linked List as Queue Variation
var RecentCounter = function () {
  this.head = null;
  this.tail = null;
  this.count = 0;
};

/**
* @param {number} t
* @return {number}
*/
RecentCounter.prototype.ping = function (t) {
  const node = {
    val: t,
    next: null
  };

  if (this.head === null) {
    this.head = node
  } else {
    this.tail.next = node;
  }

  this.tail = node;
  this.count++;

  let rangeNode = this.head;
  while (rangeNode.val < t - 3000) {
    rangeNode = rangeNode.next;
    this.count--;
  }
  this.head = rangeNode;

  return this.count;
};

// === Array as Queue Variation
var RecentCounter = function () {
  this.times = [];
};

/**
* @param {number} t
* @return {number}
*/
RecentCounter.prototype.ping = function (t) {
  this.times.push(t);

  let i = 0;
  while (i < this.times.length && this.times[i] + 3000 < t) {
    i++;
  }

  if (i !== 0) {
    this.times = this.times.slice(i);
  }

  return this.times.length;
};


// 2023/05
// O(n) -> O(1) time complexity
// O(n) -> O(1)  space complexity
// where n = # of calls within the last 3000 ms = constant since t: int
// Time to complete: 9:00 min for array var, 23:00 min for linked list var
// Patterns: Queue, Array, LinkedList
// Notes w.r.t. solution:

// === Linked List as Queue Variation
var RecentCounterLinkedList2023 = function () {
  this.head = null;
  this.tail = null;
  this.count = 0;
};

/**
* @param {number} t
* @return {number}
*/
RecentCounterLinkedList2023.prototype.ping = function (t) {
  const node = new Node(t);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  this.count++;

  let endNode = this.tail;
  while (endNode && t - endNode.val > 3000) {
    endNode = endNode.prev;
    this.count--;
  }
  if (endNode === null) {
    this.head = null;
    this.tail = null;
  } else if (endNode.next) {
    endNode.next.prev = null;
    endNode.next = null;
    this.tail = endNode;
  }

  return this.count;
};

class Node {
  constructor(t) {
    this.val = t;
    this.next = null;
    this.prev = null;
  }
}


// === Array as Queue Variation
var RecentCounterArray2023 = function () {
  this.pings = [];
};

/**
* @param {number} t
* @return {number}
*/
RecentCounterArray2023.prototype.ping = function (t) {
  this.pings.unshift(t);

  // get index to remove from list
  let indexTruncate = -1;
  for (let i = 0; i < this.pings.length; i++) {
    if (t - this.pings[i] > 3000) {
      indexTruncate = i;
      break;
    }
  }

  if (indexTruncate !== -1) {
    this.pings = this.pings.slice(0, indexTruncate)
  }

  return this.pings.length;
  // return num requests in past 3000 ms
  // return num requests within [t - 3000, t] inclusive
};



/**
* Your RecentCounter object will be instantiated and called as such:
* var obj = new RecentCounter()
* var param_1 = obj.ping(t)
*/