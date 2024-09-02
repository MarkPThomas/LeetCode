// 2024/09/02
// O(1) time complexity
// O(1) space complexity
// Time to complete: 4:10 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  // for each #:
  // if even, divide by 2
  // if odd, add 1 to high (or subtract 1 for low) & then divide by 2
  // subtract low from high
  const lowCountInclusive = low % 2 ? (low - 1) / 2 : low / 2;
  const highCount = high % 2 ? (high + 1) / 2 : high / 2;

  return highCount - lowCountInclusive;
};