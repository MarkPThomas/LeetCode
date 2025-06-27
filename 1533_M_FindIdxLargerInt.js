// 2025/06/10
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: ?? min (Forgot to time???)
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *     // Compares the sum of arr[l..r] with the sum of arr[x..y]
 *     // return 1 if sum(arr[l..r]) > sum(arr[x..y])
 *     // return 0 if sum(arr[l..r]) == sum(arr[x..y])
 *     // return -1 if sum(arr[l..r]) < sum(arr[x..y])
 *     @param {number} l, r, x, y
 *     @return {number}
 *     this.compareSub = function(l, r, x, y) {
 *         ...
 *     };
 *
 *     // Returns the length of the array
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {ArrayReader} reader
 * @return {number}
 */
var getIndex = function (reader) {
  function largeNumIdx(start, length) {
    if (length === 1) {
      return start;
    }

    const isOdd = length % 2;
    const aStart = start;
    const aEnd = aStart + Math.floor(length / 2) - 1;
    const bStart = aEnd + (isOdd % 2 ? 2 : 1); // Skip middle # if odd
    const bEnd = aStart + length - 1;

    const result = reader.compareSub(aStart, aEnd, bStart, bEnd);
    const subLengths = aEnd - aStart + 1;

    if (result === 0) { // is middle #
      return isOdd ? aEnd + 1 : -1;
    } else if (result > 0) { // look left
      return largeNumIdx(aStart, subLengths);
    } else if (result < 0) { // look right
      return largeNumIdx(bStart, subLengths);
    }
  }

  const totalLength = reader.length();
  return largeNumIdx(0, totalLength);
};


// ===== Solution =====
/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *     // Compares the sum of arr[l..r] with the sum of arr[x..y]
 *     // return 1 if sum(arr[l..r]) > sum(arr[x..y])
 *     // return 0 if sum(arr[l..r]) == sum(arr[x..y])
 *     // return -1 if sum(arr[l..r]) < sum(arr[x..y])
 *     @param {number} l, r, x, y
 *     @return {number}
 *     this.compareSub = function(l, r, x, y) {
 *         ...
 *     };
 *
 *     // Returns the length of the array
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {ArrayReader} reader
 * @return {number}
 */
var getIndex = function (reader) {
  let length = reader.length();

  let left = 0;
  while (length > 1) {
    length = Math.floor(length / 2);

    const mid = left + length - 1;
    const result = reader.compareSub(left, mid, mid + 1, left + 2 * length - 1);

    if (result === 0) { // is odd # (left at end of range)
      return left + 2 * length;
    } else if (result < 0) { // look right
      left = mid + 1;
    }
  }

  return left;
};