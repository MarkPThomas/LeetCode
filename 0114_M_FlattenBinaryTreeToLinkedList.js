// 2025/03/07
// O(n) time complexity
// O(n) space complexity
// Time to complete: 22:51 min
// Patterns: Binary Tree DFS, Linked List
// Notes w.r.t. solution: Could have saved time by drawing out process earlier & more carefully.
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  function flattenChildren(node) {
    // Non-flattening cases
    if (!node) {
      return null;
    } else if (!node.left && !node.right) {
      return node;
    }

    // Get flattened left side
    const tailLeft = flattenChildren(node.left);

    // Get flattened right side
    const tailRight = flattenChildren(node.right);

    // Insert flattened left & clear left branch
    if (tailLeft) {
      tailLeft.right = node.right;
      node.right = node.left;
    }
    node.left = null;

    // Return tail
    return tailRight ?? tailLeft;
  }

  flattenChildren(root);

  return root;
};