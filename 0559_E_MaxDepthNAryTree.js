// 2024/08/23
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6:52 min
// Patterns: Trees, N-ary Trees, BFS
// Notes w.r.t. solution: Iteration solution
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  // BFS
  const nodes = [root, null];
  let levels = 0;

  while (nodes.length) {
    const node = nodes.shift();
    if (node) {
      node.children.forEach((child) => {
        nodes.push(child);
      });
    } else {
      levels++;
      if (nodes.length && nodes[0]) {
        nodes.push(null);
      } else {
        break;
      }
    }
  }

  return levels;
};