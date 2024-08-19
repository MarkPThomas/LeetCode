// 2024/08/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:07 min
// Patterns: Stacks, Queues
// Notes w.r.t. solution:

var MyQueue = function () {
  this.stackIn = [];
  this.stackOut = [];
};

/**
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function (x) {
  while (this.stackOut.length) {
    this.stackIn.push(this.stackOut.pop());
  }

  this.stackIn.push(x);
};

/**
* @return {number}
*/
MyQueue.prototype.pop = function () {
  while (this.stackIn.length) {
    this.stackOut.push(this.stackIn.pop());
  }

  return this.stackOut.pop();
};

/**
* @return {number}
*/
MyQueue.prototype.peek = function () {
  if (this.stackIn.length) {
    return this.stackIn[0];
  } else if (this.stackOut.length) {
    return this.stackOut[this.stackOut.length - 1];
  } else {
    return null;
  }
};

/**
* @return {boolean}
*/
MyQueue.prototype.empty = function () {
  return this.stackIn.length === 0 && this.stackOut.length === 0;
};

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/