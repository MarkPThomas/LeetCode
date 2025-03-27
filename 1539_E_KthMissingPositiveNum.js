// 2025/03/27
// O(n) time complexity
// O(1) space complexity
// Time to complete: 14:21 min
// Patterns:
// Notes w.r.t. solution: Math derps
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
  if (k < arr[0]) {
    return k;
  }

  let missingNums = arr[0] - 1;
  for (let i = 0; i < arr.length - 1; i++) {
    const delta = arr[i + 1] - arr[i] - 1;

    if (k - (missingNums + delta) === 0) {
      return arr[i + 1] - 1;
    } else if (k - (missingNums + delta) < 0) {
      return arr[i] + (k - missingNums);
    } else if (delta) {
      missingNums += delta;
    }
  }

  return arr[arr.length - 1] + (k - missingNums);
};

// 2025/03/27
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 26:48 min
// Patterns: Binary Search
// Notes w.r.t. solution: Math derps
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
  if (k < arr[0]) {
    return k;
  }

  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    let numMissing = arr[mid] - (mid + 1);
    if (numMissing < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  let numMissingFinal = arr[right] - (right + 1);
  return arr[right] + (k - numMissingFinal);
  // Optimization: can just return left + k
};