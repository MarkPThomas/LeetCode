// O(log(n)) time complexity
// O(1) space complexity for stack
// Time to complete:  2:00 min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Iterative solution

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
// ==== Original ====
// var searchBST = function (root, val) {
//   let node = root;
//   while (node) {
//     if (node.val === val) {
//       return node;
//     }

//     if (val < node.val) {
//       node = node.left;
//     } else {
//       node = node.right;
//     }
//   }
//   return null;
// };

// ==== Further refactoring ====
var searchBST = function (root, val) {
  while (root !== null && root.val !== val) {
    root = val < root.val ? root.left : node = root.right;
  }
  return root;
};