// O(n) -> O(1) time complexity
// O(n) -> O(1)  space complexity
// where n = # of calls within the last 3000 ms = constant since t: int
// Time to complete: 9:00 min for array var, 23:00 min for linked list var
// Patterns:
// Notes w.r.t. solution:

// Linked List as Queue Variation
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

/**
* Your RecentCounter object will be instantiated and called as such:
* var obj = new RecentCounter()
* var param_1 = obj.ping(t)
*/

class Node {
  constructor(t) {
    this.val = t;
    this.next = null;
    this.prev = null;
  }
}


// // === Array as Queue Variation
// var RecentCounter = function () {
//   this.pings = [];
// };

// /**
// * @param {number} t
// * @return {number}
// */
// RecentCounter.prototype.ping = function (t) {
//   this.pings.unshift(t);

//   // get index to remove from list
//   let indexTruncate = -1;
//   for (let i = 0; i < this.pings.length; i++) {
//     if (t - this.pings[i] > 3000) {
//       indexTruncate = i;
//       break;
//     }
//   }

//   if (indexTruncate !== -1) {
//     this.pings = this.pings.slice(0, indexTruncate)
//   }

//   return this.pings.length;
//   // return num requests in past 3000 ms
//   // return num requests within [t - 3000, t] inclusive
// };

// /**
// * Your RecentCounter object will be instantiated and called as such:
// * var obj = new RecentCounter()
// * var param_1 = obj.ping(t)
// */