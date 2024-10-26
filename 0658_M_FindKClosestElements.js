// O(k + log(n)) time complexity
// O(1) space complexity
//  where k = #s sought, n = arr size
// Time to complete: Timeout - 20:55 min to solve 99% (55/70)
// Patterns: Binary Search
// Notes w.r.t. solution: 20:55 min to solve 99% (55/70). Went OT working out details of incrementing left/right. Should have slowed down & diagrammed that part out.
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {

  function aIsCloser(a, b, x) {
    return Math.abs(a - x) < Math.abs(b - x)
      || (a < b && Math.abs(a - x) === Math.abs(b - x));
  }

  // Simplest cases
  if (arr.length === k) {
    return arr;
  } else if (x <= arr[0]) {
    return arr.slice(0, k);
  } else if (arr[arr.length - 1] <= x) {
    return arr.slice(arr.length - k);
  }

  // Find x
  let idx = -1;
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === x) {
      idx = mid;
      break;
    } else if (arr[mid] < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // If x not found, find closest #
  if (idx === -1) {
    if (aIsCloser(arr[left], arr[right], x)) {
      idx = left;
    } else {
      idx = right;
    }
  }

  if (k === 1) {
    return [arr[idx]];
  }

  // Work outwards from x, L & R, adding closest to result
  left = idx;
  right = idx;
  while (right - left < k - 1) {
    const a = arr[left - 1];
    const b = arr[right + 1];

    if (left && (right === arr.length - 1 || aIsCloser(a, b, x))) { // a closer
      left--;
    } else { // b closer
      right++;
    }
  }

  return arr.slice(left, right + 1);
};