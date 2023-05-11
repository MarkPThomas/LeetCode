// O(n) time complexity
// O(log(n)) space complexity
// Time to complete: 24 min
// Patterns: Preorder DFS
// Notes w.r.t. solution: Moved too fast again. Lost a lot of time not realizing values can be +/-.
//    Otherwise would have been great with time.

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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root || root.val === null) {
    return false;
  }

  if (root.left === null && root.right === null) {
    return targetSum === root.val;
  }

  const leftHasPathSum = root.left !== null ? hasPathSum(root.left, targetSum - root.val) : false;
  const rightHasPathSum = root.right !== null ? hasPathSum(root.right, targetSum - root.val) : false;
  return leftHasPathSum || rightHasPathSum;
};