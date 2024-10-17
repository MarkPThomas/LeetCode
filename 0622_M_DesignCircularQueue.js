// 2024/10/16
// O(1) time complexity
// O(k) space complexity
// Time to complete: 35:51 min
// Patterns: Queue
// Notes w.r.t. solution: Would have solved in under 30 min, but accidentally pre-optimized in ways not necessary/accurate for the description.
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.queue = Array(k);
  this.start = 0;
  this.end = 0;
  this.length = 0;
};

/**
* @param {number} value
* @return {boolean}
*/
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) {
    return false;
  }

  this.length++;
  this.queue[this.end] = value;
  this.end = (this.end + 1) % this.queue.length;

  return true;
};

/**
* @return {boolean}
*/
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  }

  this.length--;
  this.start = (this.start + 1) % this.queue.length;

  return true;
};

/**
* @return {number}
*/
MyCircularQueue.prototype.Front = function () {
  return this.isEmpty() ? -1 : this.queue[this.start];
};

/**
* @return {number}
*/
MyCircularQueue.prototype.Rear = function () {
  return this.isEmpty() ? -1 : this.queue[this.end - 1] ?? this.queue[this.queue.length - 1];
};

/**
* @return {boolean}
*/
MyCircularQueue.prototype.isEmpty = function () {
  return this.length === 0;
};

/**
* @return {boolean}
*/
MyCircularQueue.prototype.isFull = function () {
  return this.length === this.queue.length;
};

/**
* Your MyCircularQueue object will be instantiated and called as such:
* var obj = new MyCircularQueue(k)
* var param_1 = obj.enQueue(value)
* var param_2 = obj.deQueue()
* var param_3 = obj.Front()
* var param_4 = obj.Rear()
* var param_5 = obj.isEmpty()
* var param_6 = obj.isFull()
*/