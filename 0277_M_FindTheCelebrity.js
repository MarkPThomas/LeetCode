// 2025/03/27
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 20:08 min
// Patterns: Graph
// Notes w.r.t. solution:
/**
 * Definition for knows()
 *
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function (n) {
    // DFS, check if cycle. Ignore cycle branches
    // Count visited nodes, should result in n - 1;

    const inVisited = {};
    const outVisited = {};
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (j === i) {
          continue;
        }

        if (knows(i, j)) {
          inVisited[j] ??= 0;
          inVisited[j]++;

          outVisited[i] ??= 0;
          outVisited[i]++;
        }
      }
    }

    for (const [key, inDegrees] of Object.entries(inVisited)) {
      if (inDegrees === n - 1 && !(key in outVisited)) {
        return Number(key);
      }
    }

    return -1;
  };
};