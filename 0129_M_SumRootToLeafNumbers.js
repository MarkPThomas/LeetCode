// 2025/03/28
// O(n) time complexity
// O(n) ->O(1) space complexity (since depth <= 10)
// Time to complete: 4:05 min
// Patterns: Binary Tree DFS
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
 * @return {number}
 */
var sumNumbers = function (root) {
  if (!root) {
    return 0;
  }

  let sum = 0;

  function dfs(node, num) {
    if (!node.left && !node.right) {
      // at leaf, record number
      sum += Number(num + node.val);
    }

    if (node.left) {
      dfs(node.left, num + node.val);
    }

    if (node.right) {
      dfs(node.right, num + node.val);
    }
  }

  dfs(root, '');

  return sum;
};