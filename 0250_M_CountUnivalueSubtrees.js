// 2024/10/10
// O(n) time complexity
// O(n) space complexity
// Time to complete: 36:34 min
// Patterns: Binary Tree, DFS, Recursion
// Notes w.r.t. solution: Constraints/edge cases of problem poorly defined/shown.
//  Lost a lot of time solving slightly incorrect problems.
//  Took until about 20 min in to properly understand through trial & error.
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
var countUnivalSubtrees = function (root) {
  let count = 0;

  function dfs(root) {
    if (!root) {
      return;
    }

    const left = dfs(root.left);
    const right = dfs(root.right);

    if (left === Infinity || right === Infinity) {
      return Infinity;
    }

    // Leaf node - always univalue subtree
    // Intermediate node - any/all children must equal value
    if ((!left || left.val === root.val)
      && (!right || right.val === root.val)) {
      count++;
      return root;
    } else {
      return Infinity;
    }

  }

  dfs(root);
  return count;
};