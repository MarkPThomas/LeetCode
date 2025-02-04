// 2025/02/04
// O(v + e) time complexity
// O(v + e) space complexity
// Time to complete: 11:49 min
// Patterns: Graph - DFS
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  const OUT = 'out';
  const IN = 'in';
  // make adjacency array
  const cities = {};
  for (let i = 0; i < n; i++) {
    cities[i] = []; // { city: n, dir: in/out }
  }

  // make array bi-directional, but note direction from connections
  for (const connection of connections) {
    cities[connection[0]].push({ city: connection[1], dir: OUT });
    cities[connection[1]].push({ city: connection[0], dir: IN });
  }

  // DFS from root (city 0).
  let numFlip = 0;
  const visited = {};
  const stack = [0];
  while (stack.length) {
    const city = stack.pop();
    visited[city] = true;
    // Expect to travel against directions
    // Flip needed directions & take count
    for (const neighbor of cities[city]) {
      if (visited[neighbor.city]) {
        continue;
      }
      stack.push(neighbor.city);
      if (neighbor.dir !== IN) {
        numFlip++;
      }
    }
  }
  return numFlip;
};