// 2025/02/12
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:03 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
  // build up stack of chars until a star is encountered
  // remove the last char & skip the star
  // repeat

  const stack = [];
  for (const char of s) {
    if (char === '*') {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join('');
};