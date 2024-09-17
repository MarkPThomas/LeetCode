// O(n) time complexity
// O(n) space complexity
// Time to complete: 20:43 min
// Patterns: Stack
// Notes w.r.t. solution: Refactored & optimized from answer.
//    Adding here for comparative reference.
//    Creating lambda functions I could/should have thought of.
//    Math's trunc feature was new & good to remember!
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  }

  const results = [];
  for (const token of tokens) {
    if (token in operations) {
      const b = results.pop();
      const a = results.pop();
      const operation = operations[token];

      const result = operation(a, b);
      results.push(result);

    } else {
      results.push(parseInt(token));
    }
  }

  return results.pop();
};

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