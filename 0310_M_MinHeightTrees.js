// 2024/10/18
// O(|V|) time complexity
// O(|V|) space complexity
// Time to complete: NA
// Patterns: DSU w/ weighted edges
// Notes w.r.t. solution: Example DSU Solution
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n < 2) {
    const centroids = [];
    for (let i = 0; i < n; i++) {
      centroids.push(i);
    }

    return centroids;
  }

  const neighbors = {};
  for (let i = 0; i < n; i++) {
    neighbors[i] = new Set();
  }

  for (const edge of edges) {
    neighbors[edge[0]].add(edge[1]);
    neighbors[edge[1]].add(edge[0]);
  }

  let leaves = [];
  for (let i = 0; i < n; i++) {
    if (neighbors[i].size === 1) {
      leaves.push(i);
    }
  }

  let remainingNodes = n;
  while (remainingNodes > 2) {
    remainingNodes -= leaves.length;

    const newLeaves = [];
    for (const leaf of leaves) {
      const parent = neighbors[leaf].values().next().value;
      neighbors[parent].delete(leaf);

      if (neighbors[parent].size === 1) {
        newLeaves.push(parent);
      }
    }

    leaves = newLeaves;
  }

  return leaves;
};