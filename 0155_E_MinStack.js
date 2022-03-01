// O(1) time complexity
// O(1) space complexity
// Time to complete: 15:05
// Patterns: stack
// Notes w.r.t. solution:

var MinStack = function() {
  this.values = [];
  this.minValues = [];
};

/**
* @param {number} val
* @return {void}
*/
MinStack.prototype.push = function(val) {
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
MinStack.prototype.pop = function() {
  this.minValues.pop();
  return this.values.pop();
};

/**
* @return {number}
*/
MinStack.prototype.top = function() {
  return this.values[this.values.length - 1];
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function() {
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