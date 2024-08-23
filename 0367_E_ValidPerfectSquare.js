// 2024/08/23
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 8:11 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  //  n * n = m
  //  if m < num, increase n
  //  if num < m, decrease n
  let left = 0;
  let right = num;
  let square = 0;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    square = mid ** 2;

    if (square === num) {
      break;
    } else if (square < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return square === num;
};