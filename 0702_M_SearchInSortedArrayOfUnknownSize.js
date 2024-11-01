// 2024/10/20
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 8:04 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 * };
 */

/**
 * @param {ArrayReader} reader
 * @param {number} target
 * @return {number}
 */
var search = function (reader, target) {
  const OUT_OF_BOUNDS = Math.pow(2, 31) - 1;

  let left = 0;
  let right = 2;
  let numInit = reader.get(right);
  while (numInit < target && numInit !== OUT_OF_BOUNDS) {
    numInit = reader.get(right);
    right *= right;
  }


  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const num = reader.get(mid);

    if (num === target) {
      return mid;
    } else if (num < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};