// 2024/09/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:47 min
// Patterns: 2 Pointer, Hashmap
// Notes w.r.t. solution:
/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
  const flippedNums = {
    0: 0,
    1: 1,
    6: 9,
    8: 8,
    9: 6
  }

  let left = 0;
  let right = num.length - 1;
  while (left <= right) {
    const leftDigit = num[left];
    const rightDigit = num[right];
    if (flippedNums[leftDigit] === undefined ||
      leftDigit != flippedNums[rightDigit]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};