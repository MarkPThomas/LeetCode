// 2024/03/27
// O(n) time complexity
// O(n) space complexity in case of adding a new integer space, else O(1)
// where n = # of digits
// Time to complete: 7:00 min
// Patterns: Math. Approach 1: Schoolbook Addition with Carry
// Notes w.r.t. solution: Would have been < 6:30 min but called shift instead of unshift.
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne2024Optimized = function (digits) {
  let sigFig = digits.length - 1;
  while (0 <= sigFig) {
    if (digits[sigFig] === 9) {
      digits[sigFig] = 0;
      sigFig--;
    } else {
      digits[sigFig]++;
      return digits;
    }
  }

  digits[0] = 1;
  digits.push(0);

  return digits;
};

// 2024/03/27
// O(n) time complexity
// O(n) space complexity in case of adding a new integer space, else O(1)
// where n = # of digits
// Time to complete: 6:33 min
// Patterns: Math. Approach 1: Schoolbook Addition with Carry
// Notes w.r.t. solution: Would have been < 6 min but called shift instead of unshift.
/**
 * @param {number[]} digits
 * @return {number[]}
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne2024 = function (digits) {
  let sigFig = digits.length - 1;
  while (0 <= sigFig) {
    if (digits[sigFig] === 9) {
      digits[sigFig] = 0;
    } else {
      digits[sigFig]++;
      return digits;
    }

    sigFig--;
  }

  if (sigFig < 0) {
    digits.unshift(1);
  }

  return digits;
};


// 2023/06
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
var plusOne2023 = function (digits) {
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