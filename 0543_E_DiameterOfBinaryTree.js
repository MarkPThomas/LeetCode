// 2024/04/27
// O(n) time complexity
// O(n) space complexity
// Time to complete: 25:00 min
// Patterns: Binary Tree, DFS Preorder
// Notes w.r.t. solution: Was correct on strategy very early. Had technical issues in implementation that took time to work out. Jumpt to solution a tad too fast!

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
var diameterOfBinaryTree = function (root) {
  let maxDiameter = 0;

  function diameterOfChildTrees(root) {
    if (!root.left && !root.right) {
      return 1;
    }

    let maxDiameterL = 0;
    if (root.left) {
      maxDiameterL = diameterOfChildTrees(root.left);
    }

    let maxDiameterR = 0;
    if (root.right) {
      maxDiameterR = diameterOfChildTrees(root.right);
    }

    maxDiameter = Math.max(maxDiameter, maxDiameterL + maxDiameterR);

    return Math.max(maxDiameterL, maxDiameterR) + 1;
  }

  diameterOfChildTrees(root, 0);

  return maxDiameter;
};