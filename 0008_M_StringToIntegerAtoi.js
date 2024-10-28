// 2024/10/28
// O(n) time complexity
// O(n) space complexity
//  where n = # chars in string
// Time to complete: 31:22 min
// Patterns: Deterministic Finite Automaton (DFA)
// Notes w.r.t. solution: Lost some time on the rounding part.
//  It was not very well clarified how to trigger it or what to return.
//  Also lost time with minor mistake of assuming '0' === 0 is falsey, when actually it is fine & ' ' == 0 is truthy.
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const state = [
    'leadingSpaces', // 0
    'sign', // 1
    'leadingZeros',  // 2
    'number', // 3
    'end', // 4
  ]
  let currentState = 0;
  let nums = Array(10).fill(true);

  const minNum = Math.pow(-2, 31);
  const maxNum = Math.pow(2, 31) - 1;

  let result = [];
  let i = 0;
  // Note: Final condition is optimization for when # is clearly above maxNum
  while (i < s.length && currentState < 4 && result.length < 12) {
    if (currentState === 0) {
      // Ignore leading whitespaces
      while (s[i] === ' ') {
        i++;
      }
      currentState++;
    } else if (currentState === 1) {
      // Check sign (if present)
      if (s[i] === '-') {
        result.push(s[i]);
      }

      if (s[i] === '-' || s[i] === '+') {
        i++;
      }
      currentState++;
    } else if (currentState === 2) {
      // Ignore leading zeros
      while (s[i] === 0) {
        i++;
      }
      currentState++;
    } else if (currentState === 3) {
      while (i < s.length && nums[s[i]] !== undefined) {
        result.push(s[i]);
        i++;
      }
      currentState++;
    }
  }

  // Check no results read
  const numChars = result.length ? result.join('') : 0;

  // Round out of range
  let num = parseInt(numChars);
  num = Math.min(Math.max(minNum, num), maxNum);

  return isNaN(num) ? 0 : num;
};