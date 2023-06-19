// O(n) time complexity
// O(n) space complexity
// Time to complete: 23:00 min
// Patterns: BST, DFS Inorder Traverse
// Notes w.r.t. solution: Wasted first half not just implementing a direct inorder traverse. A bit rusty on those.

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
var isValidBST = function (root) {
  let prevNode = null;

  // Inorder DFS
  function dfs(root) {
    if (!root) {
      return true;
    }

    // Left child
    if (root.left && !dfs(root.left)) {
      return false;
    }

    // Current node
    if (prevNode && prevNode.val >= root.val) {
      return false;
    }
    prevNode = root;

    // Right child
    if (root.right && !dfs(root.right)) {
      return false;
    }

    return true;
  }

  return dfs(root);
};