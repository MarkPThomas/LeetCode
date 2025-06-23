// 2025/06/23
// Initialize
//  O(1) time complexity
//  O(1) space complexity
// Set
//  O(1) time complexity
//  O(m * L) space complexity
// Get
//  O(n * (L * log(m)) time complexity
//  O(1) space complexity
//  where n = # get calls, m = # set calls, L = average key/value string length
//  and being extra nitpicky of including hashmap key hash time of L
// Time to complete: 13:24 min
// Patterns: Binary Search
// Notes w.r.t. solution:

var TimeMap = function () {
  this.keySets = {};
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  // timestamp strictly increasing => sorted ascending
  this.keySets[key] ??= [];
  this.keySets[key].push([value, timestamp]);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  // largest timestamp <= timestamp
  const values = this.keySets[key];
  if (!values || !values.length || timestamp < values[0][1]) {
    return '';
  } else if (values.length === 1) {
    return values[0][0];
  } else if (values[values.length - 1][1] <= timestamp) {
    return values[values.length - 1][0];
  }

  // sorted ascending, so binary search
  let left = 0;
  let right = values.length;
  while (right - left > 1) {
    const mid = left + Math.floor((right - left) / 2);

    if (values[mid][1] < timestamp) {
      left = mid;
    } else {
      right = mid;
    }
  }

  right = values[right][1] === timestamp ? right : right - 1;

  return values[right][0];
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */