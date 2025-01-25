// 2025/01/25
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 26:54 min
// Patterns: Two Heaps
// Notes w.r.t. solution:

var MedianFinder = function () {
  // PQ of descending lesser & ascending greater
  this.maxOfSmallest = new PriorityQueue({ compare: (a, b) => b - a });
  this.minOfLargest = new PriorityQueue({ compare: (a, b) => a - b });
};

/**
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function (num) {
  if (!this.maxOfSmallest.size() || this.maxOfSmallest.front() >= num) { // Add to lesser
    this.maxOfSmallest.enqueue(num);
  } else { // Add to greater
    this.minOfLargest.enqueue(num);
  }

  // Re-balance
  if (this.maxOfSmallest.size() > this.minOfLargest.size() + 1) {
    // Maintain +1 balance for lesser = max + 1 for # of odd
    this.minOfLargest.enqueue(this.maxOfSmallest.dequeue());
  } else if (this.maxOfSmallest.size() < this.minOfLargest.size()) {
    // Maintain balance for equal # of even
    this.maxOfSmallest.enqueue(this.minOfLargest.dequeue());
  }
};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function () {
  if (!this.maxOfSmallest.size()) {
    return 0;
  } else if (this.maxOfSmallest.size() !== this.minOfLargest.size()) {    // Odd size
    return this.maxOfSmallest.front();
  } else {    // Even size
    return (this.maxOfSmallest.front() + this.minOfLargest.front()) / 2;
  }
};

/**
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/