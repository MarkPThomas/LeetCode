// 2025/01/06
// Initialize
//  O(1) time complexity
//  O(1) space complexity
// popSmallest
//  O(log(n)) time complexity
//  O(1) space complexity
// addBack
//  O(log(n)) time complexity
//  O(1) space complexity
//  where n = # of numbers added via addBack + 1
// Time to complete: 20:39 min
// Patterns: Priority Queue
// Notes w.r.t. solution:

var SmallestInfiniteSet = function () {
  this.orderedSet = new PriorityQueue({ compare: (a, b) => a - b });
  this.presentNums = new Set();

  this.maxPopped = 1;
  this.orderedSet.enqueue(this.maxPopped);
  this.presentNums.add(this.maxPopped);
};

/**
* @return {number}
*/
SmallestInfiniteSet.prototype.popSmallest = function () {
  const smallest = this.orderedSet.dequeue();
  this.presentNums.delete(smallest);

  // Add next # if smallest is highest # added so far
  // Adding #s back might give something like
  //  1, ..., 5, 6, 7
  // No need to increment highest in this case, as it becomes
  //  ..., 5, 6, 7
  if (smallest === this.maxPopped) {
    this.maxPopped++;
    this.addBack(this.maxPopped);
  }

  return smallest;
};

/**
* @param {number} num
* @return {void}
*/
SmallestInfiniteSet.prototype.addBack = function (num) {
  if (!this.presentNums.has(num)) {
    this.orderedSet.enqueue(num);
    this.presentNums.add(num);
  }
};

/**
* Your SmallestInfiniteSet object will be instantiated and called as such:
* var obj = new SmallestInfiniteSet()
* var param_1 = obj.popSmallest()
* obj.addBack(num)
*/