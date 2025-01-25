// O(1) time complexity
// O(n) space complexity
// Time to complete: 15:58 min
// Patterns: Monotonic Stack
// Notes w.r.t. solution:

var StockSpanner = function () {
  this.prevHigher = [];
  this.day = 0;
};

/**
* @param {number} price
* @return {number}
*/
StockSpanner.prototype.next = function (price) {
  this.day++;

  let lastPrevHigher = this.prevHigher[this.prevHigher.length - 1];
  while (this.prevHigher.length && lastPrevHigher[0] <= price) {
    this.prevHigher.pop()
    lastPrevHigher = this.prevHigher[this.prevHigher.length - 1];
  }

  const days = this.day - (lastPrevHigher ? lastPrevHigher[1] : 0);

  this.prevHigher.push([price, this.day]);

  return days;
};

/**
* Your StockSpanner object will be instantiated and called as such:
* var obj = new StockSpanner()
* var param_1 = obj.next(price)
*/