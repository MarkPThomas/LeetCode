// O(n) time complexity
// O(n) space complexity in case of adding a new integer space
// where n = # of digits
// Time to complete: 6:00 min
// Patterns: Math
// Notes w.r.t. solution:

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let index = digits.length - 1;
  while (index >= 0) {
    if (digits[index] === 9) {
      digits[index] = 0;
      index--;
      if (index < 0) {
        digits.unshift(1);
        break;
      }
    } else {
      digits[index]++;
      break;
    }
  }
  return digits;
};