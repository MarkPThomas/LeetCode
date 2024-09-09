// 2024/09/09
// O(2^(2n)) -> O(4^n) time complexity
// O(n) space complexity
// Time to complete: 11:43 min
// Patterns: Backtracking
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const results = [];

  function backtrack(open, closed, result) {
    if (closed === open && open === n) {
      results.push(result.join(''));
      return;
    }

    if (open < n) {
      result.push('(');
      backtrack(open + 1, closed, result);
      result.pop();
    }

    if (closed < open) {
      result.push(')');
      backtrack(open, closed + 1, result);
      result.pop();
    }
  }

  backtrack(0, 0, []);
  return results;
};