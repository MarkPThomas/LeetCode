// 2025/01/20
// O(n) time complexity
// O(n) space complexity
// Time to complete: xx min
// Patterns: Prefix Sum, Cumulative Sum, Backtracking
// Notes w.r.t. solution: Optimized solution
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
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const k = targetSum;
  let count = 0;
  const sumFreqs = {};
  sumFreqs[0] = 1;

  function preorder(node, sum) {
    if (!node) {
      return;
    }

    sum += node.val;
    if (sum - k in sumFreqs) {
      count += sumFreqs[sum - k];
    }

    sumFreqs[sum] = (sumFreqs[sum] ?? 0) + 1

    // Process the subtrees
    preorder(node.left, sum);
    preorder(node.right, sum);

    // Remove the current sum in order not to use it during parallel subtree processing
    sumFreqs[sum] -= 1;
  }

  preorder(root, 0);

  return count;
};


// 2025/01/19
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: xx min
// Patterns: Prefix Sum
// Notes w.r.t. solution: Brute Force basic solution
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
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  if (!root) {
    return 0;
  }

  function countPathSumsFromNode(node, prevSum) {
    if (!node) {
      return 0;
    }

    const sum = node.val + prevSum;

    const countFromNode = sum === targetSum ? 1 : 0;
    const countFromLeft = countPathSumsFromNode(node.left, sum);
    const countFromRight = countPathSumsFromNode(node.right, sum);

    return countFromNode + countFromLeft + countFromRight;
  }

  const countFromRoot = countPathSumsFromNode(root, 0);
  const countFromLeft = pathSum(root.left, targetSum);
  const countFromRight = pathSum(root.right, targetSum);

  return countFromRoot + countFromLeft + countFromRight;
};