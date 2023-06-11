// O(log(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 15:00 min
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) {
    return root;
  }

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    if (root.left === null && root.right === null) {
      return null;
    } else if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      let successorParent = root;
      let successor = root.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent === root) {
        successorParent.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }

      root.val = successor.val;
    }
  }

  return root;
};
