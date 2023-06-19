// O(n) time complexity
// O(h) -> O(n) space complexity
// where h = depth of tree, 2 = # nodes in tree
// Time to complete: 14:00 min
// Patterns: BST
// Notes w.r.t. solution: Inorder Traversal.

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
var getMinimumDifference = function (root) {
  if (!root || (!root.left && !root.right)) {
    return Infinity;
  }

  let minLeft = Infinity;
  if (root.left) {
    let rootChild = root.left;
    while (rootChild.right) {
      rootChild = rootChild.right;
    }
    minLeft = Math.min(Math.abs(root.val - rootChild.val), getMinimumDifference(root.left))
  }

  let minRight = Infinity;
  if (root.right) {
    let rootChild = root.right;
    while (rootChild.left) {
      rootChild = rootChild.left;
    }
    minRight = Math.min(Math.abs(root.val - rootChild.val), getMinimumDifference(root.right))
  }

  return Math.min(minLeft, minRight);
};