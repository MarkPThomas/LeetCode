// O(n) time complexity
// O(h) -> O(n) space complexity
// where n = # nodes,
// where h = max depth which is log(n) in best case but becomes n as a tree becomes more unbalanced
// Time to complete: 2:40 min
// Patterns: Post-order DFS
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
var maxDepth20240310 = function (root) {
  if (!root) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
};

// 2023/05
// O(n) time complexity
// O(h) -> O(n) space complexity
// where n = # nodes,
// where h = max depth which is log(n) in best case but becomes n as a tree becomes more unbalanced
// Time to complete: 1 min
// Patterns: DFS postOrder
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
var maxDepth202405 = function (root) {
  // DFS post-order
  if (!root) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
};