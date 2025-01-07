// 2025/01/07
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:53 min
// Patterns: BFS
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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) {
    return [];
  }

  // BFS, record last node in each layer
  const rightMost = [];
  let queue = [root];
  while (queue.length) {
    const nextQueue = [];
    let node = null;
    for (let i = 0; i < queue.length; i++) {
      node = queue[i];
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }
    rightMost.push(node.val);
    queue = nextQueue;
  }

  return rightMost;
};