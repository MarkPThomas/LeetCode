// 2024/04/16
// O(1) time complexity
// O(n) space complexity
// where n = size of window
// Time to complete: 7:14 min
// Patterns: Queue
// Notes w.r.t. solution: Linked List variation, optimized from array variation
/**
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.maxSize = size;
  this.size = 0;
  this.head = null;
  this.tail = null;
  this.currentSum = 0;
};

/**
* @param {number} val
* @return {number}
*/
MovingAverage.prototype.next = function (val) {
  this.currentSum += val;

  const node = {
    val,
    next: null
  }

  if (!this.head) {
    this.head = node;
  } else {
    this.tail.next = node;
  }
  this.tail = node;

  if (this.size < this.maxSize) {
    this.size++;
  } else {
    const prev = this.head;
    this.head = this.head.next;

    prev.next = null;
    this.currentSum -= prev.val;
  }

  return this.currentSum / Math.min(this.size, this.maxSize);
};

/**
* Your MovingAverage object will be instantiated and called as such:
* var obj = new MovingAverage(size)
* var param_1 = obj.next(val)
*/


// 2023/06
// O(n) time complexity
// O(n) space complexity
// where n = size of window
// Time to complete: 4:00 min
// Patterns: Queue
// Notes w.r.t. solution: Array variation

/**
 * @param {number} size
 */
var MovingAverage2023 = function (size) {
  this.nums = [];
  this.size = size;
  this.currentSum = 0;
};

/**
* @param {number} val
* @return {number}
*/
MovingAverage2023.prototype.next = function (val) {
  this.currentSum += val;
  this.nums.push(val);
  if (this.nums.length > this.size) {
    this.currentSum -= this.nums.shift();
  }
  return this.currentSum / Math.min(this.nums.length, this.size);
};

/**
* Your MovingAverage object will be instantiated and called as such:
* var obj = new MovingAverage(size)
* var param_1 = obj.next(val)
*/

// // O(1) time complexity
// // O(n) space complexity
// // where n = size of window
// // Time to complete: +4:00 min
// // Patterns: Circular Queue
// // Notes w.r.t. solution:
// // Optimization w/ Circular Queue. Takes longer, but saves time complexity.
// /**
//  * @param {number} size
//  */
// var MovingAverage = function(size) {
//   this.nums = new Array(size).fill(0);
//   this.size = size;
//   this.count = 0;
//   this.currentSum = 0;
//   this.head = 0;
// };

// /**
// * @param {number} val
// * @return {number}
// */
// MovingAverage.prototype.next = function(val) {
//   this.count++;
//   const tail = (this.head + 1) % this.size;
//   this.currentSum += (val - this.nums[tail]);

//   this.head = tail;
//   this.nums[this.head] = val;

//   return this.currentSum / Math.min(this.count, this.size);
// };

// /**
// * Your MovingAverage object will be instantiated and called as such:
// * var obj = new MovingAverage(size)
// * var param_1 = obj.next(val)
// */