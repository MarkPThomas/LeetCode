// 2024/10/14
// O(h) -> O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 4:07 min
// Patterns: Binary Search Tree, Iteration
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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  let node = root;
  while (node) {
    if (val < node.val) {
      if (node.left) {
        node = node.left;
      } else {
        node.left = new TreeNode(val);
        return root;
      }
    } else {
      if (node.right) {
        node = node.right;
      } else {
        node.right = new TreeNode(val);
        return root;
      }
    }
  }

  return new TreeNode(val);
};

// 2024/10/14
// O(h) -> O(log(n)) time complexity
// O(h) -> O(log(n)) space complexity
// Time to complete: 4:01 min
// Patterns: Binary Search Tree, Recursion
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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (!root) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else if (root.val < val) {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
};