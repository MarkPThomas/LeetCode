// 2025/01/02
// O(abs(d)) time complexity
// O(abs(d)) space complexity
// where d = length of denominator
// Time to complete: 41:07 min
// Patterns: Hashmap
// Notes w.r.t. solution: Coded in 24:47. Mild mistake on what to track in hashmap took remaining time.
// Starting out slower & outlining steps in comments before coding would have helped - esp. since complexity made it harder to see.
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
  if (!numerator) {
    return '0';
  }

  const fraction = [];

  // Determine sign
  if (numerator < 0 ^ denominator < 0) {
    fraction.push('-');
  }

  // Calculate integer
  const dividend = Math.abs(numerator);
  const divisor = Math.abs(denominator);
  const multiplier = Math.floor(dividend / divisor);
  fraction.push(multiplier);

  let remainder = (dividend % divisor) * 10;
  if (!remainder) {
    return fraction.join('');
  }

  // Calculate decimal
  fraction.push('.');

  const decimals = {};
  while (remainder) {
    if (decimals[remainder]) {
      fraction.splice(decimals[remainder], 0, '(');
      fraction.push(')');
      break;
    }

    decimals[remainder] = fraction.length;

    const multiplier = Math.floor(remainder / divisor);
    fraction.push(multiplier);

    remainder = (remainder % divisor) * 10;
  }

  return fraction.join('');
};