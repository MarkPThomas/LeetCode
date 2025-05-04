// 2025/05/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: 15:32 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  // decompose 's' into primitive sets
  // combine result
  const OPEN = '(';
  const CLOSE = ')';

  const result = [];

  let inPrimitive = false;
  let balance = 0;
  for (const char of s) {
    if (!inPrimitive) {
      inPrimitive = true;
    } else {
      if (char === OPEN) {
        balance--;
      } else if (char === CLOSE) {
        balance++;

        if (balance > 0) {
          balance = 0;
          inPrimitive = false;
        }
      }

      if (inPrimitive) {
        result.push(char);
      }
    }
  }

  return result.join('');
};