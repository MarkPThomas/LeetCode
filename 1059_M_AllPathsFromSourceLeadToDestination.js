// 2024/10/16
// O(v + e) time complexity
// O(v + e) space complexity
// Time to complete: 28:42 min
// Patterns: Graph - DFS
// Notes w.r.t. solution: Had solved by 12:24, but lost 4 min to minor bug, then another 12 to handling edge cases
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var leadsToDestination = function (n, edges, source, destination) {
  if (source === destination && !edges.length) {
    return true;
  }

  // T: (v)
  // S: (v)
  const neighbors = {};
  for (let i = 0; i < n; i++) {
    neighbors[i] = [];
  }

  // T: (e)
  // S: (v + e)
  for (const edge of edges) {
    neighbors[edge[0]].push(edge[1]);
  }

  let pathsFound = 0;
  let pathsToFind = 0;
  for (const neighbor of neighbors[source]) {
    pathsToFind++;

    let pathFound = false;
    const visited = {};
    const stack = [neighbor];
    while (stack.length && !pathFound) {
      const node = stack.pop();

      visited[node] = true;
      if (!neighbors[node].length) {
        if (node === destination) {
          pathFound = true;
          pathsFound++;
          visited[node] = false;
        } else { // Dead end
          return false;
        }
      }

      for (const neighbor of neighbors[node]) {
        if (visited[neighbor]) { // Cycle
          return false;
        }

        stack.push(neighbor);
      }
    }
  }

  return neighbors[source].length && pathsFound === neighbors[source].length;
};