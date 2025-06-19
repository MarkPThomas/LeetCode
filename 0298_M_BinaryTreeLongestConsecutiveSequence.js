// 2025/06/19
// O(n) time complexity
// O(n) space complexity
// Time to complete: 8:20 min
// Patterns: Tree DFS
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
var longestConsecutive = function (root) {
  let longestPath = 1;

  function dfs(node, prevVal, length) {
    if (!node) {
      return;
    }

    if (node.val - prevVal === 1) {
      length++;
      longestPath = Math.max(longestPath, length);
    } else {
      length = 1;
    }

    dfs(node.left, node.val, length);
    dfs(node.right, node.val, length);
  }

  dfs(root, Infinity, 0);

  return longestPath;
};