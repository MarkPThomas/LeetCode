// 2025/06/07
// Intialize:
//  O(1) time complexity
//  O(1) space complexity
// Hit:
//  O(n) -> O(1) time complexity due to size limit
//  O(n) -> O(1) space complexity due to size limit
// GetHits:
//  O(log(n)) time complexity
//  O(1) space complexity
// Time to complete: 35:57 = 29:15 min + 6:42 min (to add binary search from prev sol)
// Patterns: Queue, Binary Search
// Notes w.r.t. solution:
var HitCounter = function () {
  this.limit = 300; // sec = 5 min
  this.hitsByTime = [];
  this.lastRemovedHits = 0;
};

/**
* @param {number} timestamp
* @return {void}
*/
HitCounter.prototype.hit = function (timestamp) {
  // multiple hits can occur @ same time, but monotonically increasing times
  // applies to hit/getHint calls, i.e. timestamp between either synced this way
  // hit[time] = #
  if (!this.hitsByTime.length) {
    this.hitsByTime.push([timestamp, 1]);
  } else if (this.hitsByTime[this.hitsByTime.length - 1][0] !== timestamp) {
    const prevHits = this.hitsByTime[this.hitsByTime.length - 1][1];
    this.hitsByTime.push([timestamp, prevHits + 1]);
  } else {
    this.hitsByTime[this.hitsByTime.length - 1][1]++;
  }

  while (this.hitsByTime.length > this.limit) {
    this.lastRemovedHits = this.hitsByTime.length.shift()[1];
  }
};

/**
* @param {number} timestamp
* @return {number}
*/
HitCounter.prototype.getHits = function (timestamp) {
  // # hits over last 300 sec from timestamp
  // track total hits from beginning
  // get hits over prev timeframe by subtracting difference of current to time checked
  // find time to check via binary search

  if (!this.hitsByTime.length) {
    return 0;
  }

  let max = this.hitsByTime.length - 1;
  const maxTime = this.hitsByTime[max][0];
  if (timestamp - maxTime >= this.limit) {
    this.hitsByTime = [];
    return 0;
  }

  const min = this.getMinTimeIndex(timestamp)

  const maxTotalHits = this.hitsByTime[max][1];
  const minTotalHits = min > 0 ? this.hitsByTime[min - 1][1] : this.lastRemovedHits;

  return maxTotalHits - minTotalHits;
};

HitCounter.prototype.getMinTimeIndex = function (timestamp) {
  // Get last valid timestamp
  let min = 0;
  let max = this.hitsByTime.length - 1;
  while (min < max) {
    const mid = min + Math.floor((max - min) / 2);
    if (timestamp - this.hitsByTime[mid][0] < this.limit) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }

  return min;
}

/**
* Your HitCounter object will be instantiated and called as such:
* var obj = new HitCounter()
* obj.hit(timestamp)
* var param_2 = obj.getHits(timestamp)
*/

// 2025/06/07
// Intialize:
//  O(1) time complexity
//  O(1) space complexity
// Hit:
//  O(n) -> O(1) time complexity due to size limit
//  O(n) -> O(1) space complexity due to size limit
// GetHits:
//  O(n) time complexity
//  O(1) space complexity
// Time to complete: 29:15 min
// Patterns: Queue
// Notes w.r.t. solution:

var HitCounter = function () {
  this.limit = 300; // sec = 5 min
  this.hitsByTime = [];
  this.lastRemovedHits = 0;
};

/**
* @param {number} timestamp
* @return {void}
*/
HitCounter.prototype.hit = function (timestamp) {
  // multiple hits can occur @ same time, but monotonically increasing times
  // applies to hit/getHint calls, i.e. timestamp between either synced this way
  // hit[time] = #
  if (!this.hitsByTime.length) {
    this.hitsByTime.push([timestamp, 1]);
  } else if (this.hitsByTime[this.hitsByTime.length - 1][0] !== timestamp) {
    const prevHits = this.hitsByTime[this.hitsByTime.length - 1][1];
    this.hitsByTime.push([timestamp, prevHits + 1]);
  } else {
    this.hitsByTime[this.hitsByTime.length - 1][1]++;
  }

  // T: O(1) since O(n) of shift is limited by this.limit
  // S: O(1) since O(n) of hitsByTime is limited by this.limit
  while (this.hitsByTime.length > this.limit) {
    this.lastRemovedHits = this.hitsByTime.length.shift()[1];
  }
};

/**
* @param {number} timestamp
* @return {number}
*/
HitCounter.prototype.getHits = function (timestamp) {
  // # hits over last 300 sec from timestamp
  // track total hits from beginning
  // get hits over prev timeframe by subtracting difference of current to time checked
  // find time to check via binary search

  if (!this.hitsByTime.length) {
    return 0;
  }

  let max = this.hitsByTime.length - 1;
  const maxTime = this.hitsByTime[max][0];
  if (timestamp - maxTime >= this.limit) {
    this.hitsByTime = [];
    return 0;
  }

  let min = max;
  while (min > 0 && timestamp - this.hitsByTime[min - 1][0] < this.limit) {
    min--;
  }

  const maxTotalHits = this.hitsByTime[max][1];
  const minTotalHits = min > 0 ? this.hitsByTime[min - 1][1] : this.lastRemovedHits;

  return maxTotalHits - minTotalHits;
};

/**
* Your HitCounter object will be instantiated and called as such:
* var obj = new HitCounter()
* obj.hit(timestamp)
* var param_2 = obj.getHits(timestamp)
*/