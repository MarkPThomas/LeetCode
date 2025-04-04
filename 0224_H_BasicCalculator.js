// 2025/04/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 52:00 min
// Patterns: Stack
// Notes w.r.t. solution: This just takes a LONG time to code! Lots of little edge cases to consider as well.
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {

  function sumLatestSet() {
    // Finish building number from ints
    if (digits.length) {
      const num = Number(digits.join(''));
      // Add positive sign if no sign was found earlier
      if (stack[stack.length - 1] !== POSITIVE && stack[stack.length - 1] !== NEGATIVE) {
        stack.push(POSITIVE);
      }
      stack.push(num);

      digits = [];
    }

    // Sum latest bracket set
    let sum = 0;
    while (stack.length && stack[stack.length - 1] !== OPEN) {
      const num = stack.pop();
      const sign = stack.pop();

      sum += signs[sign] * num;
    }

    if (stack[stack.length - 1] === OPEN) {
      stack.pop(); // Remove (
    }

    if (stack[stack.length - 1] in signs) {
      // Include outer sign for set
      const lastSign = stack.pop();
      sum *= signs[lastSign];
    }

    // Add sign, sum back in
    const updatedSign = sum < 0 ? NEGATIVE : POSITIVE;
    stack.push(updatedSign);
    stack.push(Math.abs(sum));
  }

  const signs = {};
  const POSITIVE = '+';
  const NEGATIVE = '-';
  signs[POSITIVE] = 1;
  signs[NEGATIVE] = -1;

  const OPEN = '(';
  const CLOSE = ')';
  const EMPTY = ' ';

  // Sequence is [sign1, num1, sign2, num2, ...]
  // w/ optional ( to indicate when to stop consolidation from )
  //  e.g. [sign1, num1, sign2, (, sign3, num2, ...]
  const stack = [];

  // Add intial sign if none is explicit
  if (s[0] !== NEGATIVE && s[0] !== POSITIVE) {
    stack.push(POSITIVE);
  }

  let digits = [];

  for (const char of s) {
    if (char === EMPTY) {
      continue;
    } else if (char === NEGATIVE || char === POSITIVE) {
      // Generate & add prev number
      if (digits.length) {
        let num = Number(digits.join(''));
        digits = [];
        stack.push(num);
      }

      // Add curr sign
      stack.push(char);
    } else if (char === OPEN) {
      stack.push(char);
    } else if (char === CLOSE) {
      sumLatestSet();
    } else { // char is digit, build num
      // Include inferred + for new set if needed
      if (stack[stack.length - 1] === OPEN) {
        stack.push(POSITIVE);
      }

      digits.push(char);
    }
  }

  // Sum for any remaining set
  sumLatestSet();

  const num = stack.pop();
  const sign = stack.pop()
  return signs[sign] * num;
};