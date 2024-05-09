// 2024/05/09
// O(n) time complexity
// O(1) space complexity
// Time to complete: 15:30 min
// Patterns: Array
// Notes w.r.t. solution: Brain fart for time. Slow down. Got bogged in multiple criteria being considered simultaneously.
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function (arr) {
  if (arr.length < 3) {
    return false;
  }

  let passedPeak = false;
  for (let i = 0; i < arr.length - 1; i++) {
    if (!passedPeak && 0 < i && arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      passedPeak = true;
    } else if ((!passedPeak && arr[i] >= arr[i + 1]) || (passedPeak && arr[i] <= arr[i + 1])) {
      return false;
    }
  }

  return passedPeak;
};