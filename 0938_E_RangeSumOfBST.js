// 2025/04/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:19 min
// Patterns: Binary Search Tree - DFS
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
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  // what happens if low = high? Return node value that matches, or 0
  // If node.val === low, only check right
  // node.val < low, only check right
  //  If node.val ==== high, only check left
  // node.val > high, only check left
  //  Else, if low < node.val < high, check left & right

  function bstSum(node) {
    if (!node) {
      return 0;
    }

    if (low === high && node.val === low) {
      return node.val;
    }

    let nodeSum = (low <= node.val && node.val <= high) ? node.val : 0;

    let leftSum = 0;
    let rightSum = 0;
    if (node.val < low) { // not <= since nodes unique
      rightSum = bstSum(node.right);
    } else if (node.val > high) { // not >= since nodes unique
      leftSum = bstSum(node.left);
    }

    return leftSum + rightSum + nodeSum;
  }

  return bstSum(root);
};