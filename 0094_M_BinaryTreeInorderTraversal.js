// O(n) time complexity
// O(n) space complexity
// Time to complete: 1:00 min
// Patterns: Binary Tree DFS Inorder
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const values = [];
  dfsInOrder(root, values);
  return values;
};

function dfsInOrder(root, values) {
  if (!root) {
    return;
  }

  if (root.left) {
    dfsInOrder(root.left, values);
  }

  values.push(root.val);

  if (root.right) {
    dfsInOrder(root.right, values);
  }
}