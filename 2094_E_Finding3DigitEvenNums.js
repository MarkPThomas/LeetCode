// 2025/06/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 24:15 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
  // no leading 0
  // make 3 digit #
  // must end in even #
  function buildNumbers(number) {
    if (number.length === 3) {
      numbers.add(Number(number.join('')));
      return;
    }

    const canBeZero = (number.length > 0);
    const mustBeEven = (number.length === 2);

    for (const digitKey of Object.keys(freqs)) {
      const digit = Number(digitKey);
      if (freqs[digit] > 0
        && (canBeZero || digit !== 0)
        && (!mustBeEven || digit % 2 == 0)) {

        number.push(digit);
        freqs[digit]--;

        buildNumbers(number);

        number.pop();
        freqs[digit]++;
      }
    }
  }

  // track count of even #s, & separate odd #s
  const freqs = {};
  for (const digit of digits) {
    freqs[digit] = (freqs[digit] ?? 0) + 1;
  }

  // Build #s
  const numbers = new Set();
  buildNumbers([]);

  return [...numbers].sort((a, b) => a - b);
};