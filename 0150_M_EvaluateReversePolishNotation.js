// O(n) time complexity
// O(n) space complexity
// Time to complete: 20:43 min
// Patterns: Stack
// Notes w.r.t. solution: Was 11:46, but had minor bugs & troubleshooting of division
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const operators = {
    '+': true,
    '-': true,
    '*': true,
    '/': true,
  }

  const operations = [];
  for (const token of tokens) {
    if (operators[token]) {
      const b = operations.pop();
      const a = operations.pop();

      let result = 0;
      if (token === '+') {
        result = a + b;
      } else if (token === '-') {
        result = a - b;
      } else if (token === '*') {
        result = a * b;
      } else if (token === '/') {
        result = a / b;
        if (result < 0) {
          result = Math.ceil(result);
        } else {
          result = Math.floor(result);
        }
      }
      operations.push(result);

    } else {
      operations.push(parseInt(token));
    }
  }

  return operations.pop();
};