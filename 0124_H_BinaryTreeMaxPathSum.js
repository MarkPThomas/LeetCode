// 2025/03/04
// O(n) time complexity
// O(h) -> O(n) space complexity
//  where n = # nodes, h = max depth of tree -> n
// Time to complete: 7:24 min
// Patterns: Tree DFS Postorder, Binary Tree
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
var maxPathSum = function (root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (!node) {
      return 0;
    }

    const sumLeft = dfs(node.left);
    const sumRight = dfs(node.right);

    const sumChildren = sumLeft + sumRight + node.val;
    const sumMaxBranch = Math.max(0, sumLeft, sumRight) + node.val;
    maxSum = Math.max(maxSum, sumChildren, sumMaxBranch);

    return sumMaxBranch;
  }

  dfs(root);
  return maxSum;
};