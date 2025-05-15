// 2025/05/14
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:04 min
// Patterns: Binary Tree - BFS
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function (root) {
  // sounds like BFS
  // at each level we know how many nodes to expect - 2^h, where h = depth
  // we can only have fewer if we are on the last row
  //  i.e. no more nodes are being added to the next queue

  let nodes = [root];
  let level = 0;
  while (nodes.length) {

    let prevNode = true;
    const nextNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.left) {
        if (!prevNode) {
          return false;
        }
        nextNodes.push(node.left);
      } else {
        prevNode = false;
      }

      if (node.right) {
        if (!prevNode) {
          return false;
        }
        nextNodes.push(node.right);
      } else {
        prevNode = false;
      }
    }

    if (!nextNodes.length) {
      return true;
    } else if (nodes.length < 2 ** level) {
      return false;
    }

    nodes = nextNodes;
    level++;
  }

  return false;
};