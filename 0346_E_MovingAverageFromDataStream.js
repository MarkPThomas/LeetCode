// O(n) time complexity
// O(n) space complexity
// where n = size of window
// Time to complete: 4:00 min
// Patterns: Queue
// Notes w.r.t. solution:

/**
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.nums = [];
  this.size = size;
  this.currentSum = 0;
};

/**
* @param {number} val
* @return {number}
*/
MovingAverage.prototype.next = function (val) {
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