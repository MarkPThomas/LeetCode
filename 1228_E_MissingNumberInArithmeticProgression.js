// 2024/03/18
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 31:04 min
// Patterns: Binary Search
// Notes w.r.t. solution: Got lost debugging. Was too fast (forgot signs, sloppy on else condition)
/**
 * @param {number[]} arr
 * @return {number}
 */
var missingNumber = function (arr) {
  // determine delta = smallest of two deltas
  const sign = arr[1] > arr[0] ? 1 : -1;
  const delta = sign * Math.min(Math.abs(arr[1] - arr[0]), Math.abs(arr[2] - arr[1]));

  if (delta === 0) {
    return arr[0];
  }

  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (arr[0] + mid * delta === arr[mid]) { // before gap
      low = mid + 1;
    } else { // after gap
      high = mid - 1;
    }
  }

  return arr[low] - delta;
};


// 2023
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 18:00 min
// Patterns: Binary Search
// Notes w.r.t. solution:

/**
 * @param {number[]} arr
 * @return {number}
 */
var missingNumber2023 = function (arr) {
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