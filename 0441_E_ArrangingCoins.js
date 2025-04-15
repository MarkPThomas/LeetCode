// 2025/04/14
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 12:00 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
  let min = 1;
  let max = n;
  while (min <= max) {
    const mid = min + Math.floor((max - min) / 2);

    let multiplier = mid % 2 === 0 ? mid / 2 + 0.5 : (mid + 1) / 2;
    const numCoins = mid * multiplier;

    if (numCoins === n) {
      return mid;
    } else if (numCoins < n) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return max;
};

// 2025/04/14
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:38 min
// Patterns: Prefix Sum
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
  // brute force is to sum 1+2+3... until the sum > n
  // Return row - 1 of this (or row if sum === n)
  // T: O(n)

  let coins = 0;
  let rowLength = 0;

  while (coins < n) {
    rowLength++;
    coins += rowLength;
  }

  return coins > n ? rowLength - 1 : rowLength;
};