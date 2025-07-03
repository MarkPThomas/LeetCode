// 2025/07/02
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:48 min
// Patterns: N-ary Tree, Hashmap, Tree DFS
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {_Node[]} tree
 * @return {_Node}
 */
var findRoot = function (tree) {
  // We could rebuild the tree...
  // or
  // Since each node has a unique val, we could:
  //  1. Store each val in a hashmap
  //  2. Check each node's children & remove them from the hashmap
  //  3. The hashmap should only have 1 node left, the root
  const nodes = {};
  for (const node of tree) {
    nodes[node.val] = node;
  }

  for (const node of tree) {
    for (const child of node.children) {
      delete nodes[child.val];
    }
  }

  const rootVal = Object.keys(nodes)[0];
  return nodes[rootVal];
};