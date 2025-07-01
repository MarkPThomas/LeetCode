// 2025/07/01
// O(n) time complexity
// O(n) space complexity
// Time to complete: 5:29 min
// Patterns: Binary Tree - DFS Postorder
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
var maximumAverageSubtree = function (root) {
  // sounds like a DFS postorder thing
  // return sum & # nodes
  // track max avg
  let maxAvg = 0;

  function getSumCount(node) {
    if (!node) {
      return [0, 0];
    }

    const [sumLeft, countLeft] = getSumCount(node.left);
    const [sumRight, countRight] = getSumCount(node.right);

    const sumTotal = sumLeft + sumRight + node.val;
    const countTotal = countLeft + countRight + 1;
    const avg = sumTotal / countTotal;
    maxAvg = Math.max(maxAvg, avg);

    return [sumTotal, countTotal];
  }

  getSumCount(root);

  return maxAvg;
};