// O(log(n)) time complexity
// O(log(n)) space complexity for stack
// Time to complete: 1:00 min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Recursive solution

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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) {
    return null;
  }
  if (root.val === val) {
    return root;
  }
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
};
