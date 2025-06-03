// 2025/06/03
// O(n) time complexity
// O(n) space complexity
// Time to complete: 23:45 min
// Patterns: Two Pointers
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var maximumOddBinaryNumber = function (s) {
  const digits = s.split('');

  let nextZero = 0;
  let nextOne = 0;
  let lastOne = -1;
  while (nextOne < digits.length) {
    // Get next 1
    while (digits[nextOne] !== '1' && nextOne < digits.length) {
      nextOne++;
    }

    // Get next 0 before 1
    while (digits[nextZero] !== '0' && nextZero < nextOne) {
      nextZero++;
    }

    // Swap & advance
    if (digits[nextZero] === '0' && digits[nextOne] === '1') {
      digits[nextZero] = '1';
      digits[nextOne] = '0';
      lastOne = nextZero;
    }

    nextOne++;
  }

  // Move last 1 to last place
  if (lastOne === -1) {
    lastOne = digits.length - 1;
    while (lastOne > 0 && digits[lastOne] !== '1') {
      lastOne--;
    }
  }

  if (digits[lastOne] === '1' && digits[digits.length - 1] === '0') {
    digits[lastOne] = '0';
    digits[digits.length - 1] = '1';
  }

  return digits.join('');
};