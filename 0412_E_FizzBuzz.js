// 2024/05/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:13 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  const result = [];

  for (let i = 1; i <= n; i++) {
    let answer = '';

    if (!(i % 3)) {
      answer += 'Fizz';
    }

    if (!(i % 5)) {
      answer += 'Buzz';
    }

    if (!answer) {
      answer = i.toString();
    }

    result.push(answer);
  }

  return result;
};