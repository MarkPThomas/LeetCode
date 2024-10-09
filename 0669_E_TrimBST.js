// 2024/10/09
// O(n) time complexity
// O(n) space complexity (for recursion of visiting n nodes)
// Time to complete: 7:16 min
// Patterns: Binary Search Tree
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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
  if (!root) {
    return null;
  }

  if (root.val < low) {
    return trimBST(root.right, low, high);
  }

  if (high < root.val) {
    return trimBST(root.left, low, high);
  }

  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);

  return root;
};

// 2023/07
// O(n) time complexity
// O(n) space complexity (for recursion of visiting n nodes)
// Time to complete: 9 min
// Patterns: Binary Search Tree
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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
  if (!root) {
    return root;
  }

  if (root.val < low) {
    root = trimBST(root.right, low, high);
  } else if (high < root.val) {
    root = trimBST(root.left, low, high);
  } else {
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
  }
  return root;
};