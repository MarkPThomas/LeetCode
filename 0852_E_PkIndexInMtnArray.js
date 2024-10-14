// 2024/10/14
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 6:16 min
// Patterns: Binary search
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) {
      return mid;
    } else if (arr[mid - 1] < arr[mid]) {
      // Follow increasing slope
      left = mid + 1;
    } else {
      right = mid;
    }
  }
};

// 2023/05
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 7 min
// Patterns: Binary search
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const pivot = Math.floor((left + right) / 2);
    if (arr[pivot - 1] < arr[pivot] && arr[pivot] > arr[pivot + 1]) {
      return pivot;
    }
    if (arr[pivot] < arr[pivot + 1]) {
      // Values increasing
      left = pivot;
    } else {
      // Values decreasing
      right = pivot;
    }
  }

  return;
};