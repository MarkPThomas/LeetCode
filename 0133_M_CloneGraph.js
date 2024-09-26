// O(n + m) time complexity
// O(n) space complexity
//  where n = # nodes
//    m = # edges
// Time to complete: 11:22 min
// Patterns: Graph, DFS w/ Iteration
// Notes w.r.t. solution:
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  if (!node) {
    return node;
  }

  const cloned = {};
  const nodes = [node];
  while (nodes.length) { // T: O(n), S: O(n)
    const node = nodes.pop();
    if (cloned[node.val]) {
      continue;
    }

    const clone = new Node(node.val);
    cloned[node.val] = clone;

    for (const neighbor of node.neighbors) {
      if (!cloned[neighbor.val]) {
        nodes.push(neighbor);
      }
    }
  }

  const linked = {};
  nodes.push(node);
  while (nodes.length) { // T: O(n + m), S: O(n)
    const node = nodes.pop();
    if (linked[node.val]) {
      continue;
    }

    const clone = cloned[node.val];
    for (const neighbor of node.neighbors) {
      clone.neighbors.push(cloned[neighbor.val]);

      if (!linked[neighbor.val]) {
        nodes.push(neighbor);
      }
    }

    linked[node.val] = clone;
  }

  return cloned[1];
};