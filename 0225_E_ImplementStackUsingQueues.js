// 2024/05/21
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6:11 min
// Patterns: Queue, Stack
// Notes w.r.t. solution: This is a silly problem.
//  Other solutions include:
//      temp array in either the push or pop methods to swap in after removal
//      reversing the array beforr/after the dequeue :-P

var MyStack = function () {
  this.queue = [];
  this.queueStack = [];
};

/**
* @param {number} x
* @return {void}
*/
MyStack.prototype.push = function (x) {
  this.queue.push(x);
  this.queueStack.unshift(x);
};

/**
* @return {number}
*/
MyStack.prototype.pop = function () {
  this.queue.pop();
  return this.queueStack.shift();
};

/**
* @return {number}
*/
MyStack.prototype.top = function () {
  return this.queue[this.queue.length - 1];
};

/**
* @return {boolean}
*/
MyStack.prototype.empty = function () {
  return !this.queue.length;
};

/**
* Your MyStack object will be instantiated and called as such:
* var obj = new MyStack()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.empty()
*/