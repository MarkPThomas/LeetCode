// 2024/08/22
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 3:47 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 0;
    let right = n;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      const isBad = isBadVersion(mid);

      if (isBad) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };
};