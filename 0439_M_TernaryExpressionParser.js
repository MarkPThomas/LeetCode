// 2025/07/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 17:12 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} expression
 * @return {string}
 */
var parseTernary = function (expression) {
  const CONDITION = '?';
  const OR = ':';
  const TRUE = 'T';

  const choices = [];
  let i = expression.length - 1;
  while (i >= 0) {
    const char = expression[i];

    if (char === CONDITION) {
      i--;
      const condition = expression[i];
      const result1 = choices.pop();
      const result2 = choices.pop();

      if (condition === TRUE) {
        choices.push(result1);
      } else {
        choices.push(result2);
      }
    } else if (char !== OR) {
      choices.push(char);
    }

    i--;
  }

  return choices.pop();
};