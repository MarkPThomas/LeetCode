// 2025/06/26
// O(n) time complexity
// O(n) space complexity
// Time to complete: 15:30 min
// Patterns: Binary Tree DFS Postorder
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
 * @return {number}
 */
var largestBSTSubtree = function (root) {
  // check left & right branches
  // see if BST. Count # nodes of BST
  // DFS inorder
  function largestBst(node) { // return min, max, # BST
    if (!node) {
      return [Infinity, -Infinity, 0];
    }

    const [leftMin, leftMax, leftNumBst] = largestBst(node.left);
    const [rightMin, rightMax, rightNumBst] = largestBst(node.right);
    let numBst = 0;
    if (leftMax < node.val && node.val < rightMin) {
      numBst = leftNumBst + rightNumBst + 1;
      return [Math.min(node.val, leftMin), Math.max(node.val, rightMax), numBst];
    } else {
      return [-Infinity, Infinity, Math.max(leftNumBst, rightNumBst)];
    }
  }

  return largestBst(root)[2];
};