// 2024/11/24
// O(n) time complexity
// O(1) space complexity
//  where n = # characters in string
// Time to complete: 26:12 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
  const sign = (s[0] === '-' || s[0] === '+');
  let decimalFound = false;
  let exponentStarted = false;
  let exponentSign = false;
  let exponentNumber = false;
  let numberStarted = false;

  for (let i = sign ? 1 : 0; i < s.length; i++) {
    if ((s[i] === '-' || s[i] === '+')) {
      if (exponentStarted && !exponentSign && !exponentNumber) {
        exponentSign = true;
        continue;
      } else {
        return false;
      }
    }

    if (s[i] === '.') {
      if (!decimalFound && !exponentStarted) {
        decimalFound = true;
        continue;
      } else {
        return false;
      }
    }

    if (s[i].toLowerCase() === 'e') {
      if (numberStarted && !exponentStarted) {
        exponentStarted = true;
        continue;
      } else {
        return false;
      }
    }

    if (0 <= Number(s[i]) || Number(s[i]) <= 9) {
      if (!numberStarted) {
        numberStarted = true;
      } else if (exponentStarted) {
        exponentNumber = true;
      }
    } else {
      return false;
    }
  }

  return exponentStarted ? exponentNumber : numberStarted;
};