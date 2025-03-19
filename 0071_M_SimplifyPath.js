// 2025/03/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:06 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = [];

  const pathElements = path.split('/');
  for (const element of pathElements) {
    if (element === '..') {
      // move one directory up
      stack.pop();
    } else if (element === '' || element === '.') {
      continue;
    } else {
      stack.push(element);
    }
  }

  return '/' + stack.join('/');
};