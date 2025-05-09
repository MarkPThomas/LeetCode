// 2025/05/09
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:08 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var clearDigits = function (s) {
  const result = [];
  for (const char of s) {
    if (isNaN(parseInt(char))) {
      result.push(char);
    } else {
      result.pop();
    }
  }

  return result.join('');
};