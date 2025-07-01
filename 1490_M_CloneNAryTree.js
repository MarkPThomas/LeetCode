// 2025/07/01
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:39 min
// Patterns: Tree DFS Preorder
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val === undefined ? 0 : val;
 *    this.children = children === undefined ? [] : children;
 * };
 */

/**
 * @param {_Node|null} node
 * @return {_Node|null}
 */
var cloneTree = function (root) {

  function dfsClone(node) {
    if (!node) {
      return null;
    }

    const nodeClone = new Node(node.val);
    for (const child of node.children) {
      nodeClone.children.push(dfsClone(child));
    }

    return nodeClone;
  }

  return dfsClone(root);
};