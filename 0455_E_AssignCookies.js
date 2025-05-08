// 2025/05/08
// O(m * log (m) + n * log(n)) time complexity
// O(max(m, n)) space complexity
//  where m = # children, n = # cookies
// Time to complete: 4:50 min
// Patterns: Greedy, 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let numSatisfied = 0;
  let child = 0;
  let cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) {
      child++;
      numSatisfied++;
    }
    cookie++;
  }

  return numSatisfied;
};