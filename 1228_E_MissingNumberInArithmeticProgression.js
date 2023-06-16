// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 18:00 min
// Patterns: Binary Search
// Notes w.r.t. solution:

/**
 * @param {number[]} arr
 * @return {number}
 */
var missingNumber = function (arr) {
  let delta = Math.min(Math.abs(arr[1] - arr[0]), Math.abs(arr[2] - arr[1]));
  if (arr[1] - arr[0] < 0) {
    delta *= -1;
  }
  if (delta === 0) {
    return arr[0];
  }

  let min = 0;
  let max = arr.length - 1;
  while (min < max) {
    const mid = Math.floor(min + (max - min) / 2);
    if (arr[mid] === arr[0] + delta * mid) {
      if (arr[mid + 1] === arr[0] + delta * (mid + 1)) {
        min = mid;
      } else {
        return arr[mid] + delta;
      }
    } else {
      max = mid;
    }
  }
};