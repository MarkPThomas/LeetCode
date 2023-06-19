// O(n) time complexity
// O(n) space complexity
// Time to complete: 14:00 min
// Patterns: BFS in Binary Tree
// Notes w.r.t. solution: Lost a bit of time with handling sentinel node. Be more careful with this.

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
var maxLevelSum = function (root) {
  let maxSum = -Infinity;
  let levelMaxSum = 0;

  let rowSum = 0;
  let level = 1;
  const ENDROW = 'endRow';
  const queue = [root, ENDROW];

  while (queue.length) {
    const node = queue.shift();
    if (node === ENDROW) {
      if (rowSum > maxSum) {
        maxSum = rowSum;
        levelMaxSum = level;
      }
      if (queue.length) {
        level++;
        rowSum = 0;
        queue.push(ENDROW);
      }
    } else if (node) {
      rowSum += node.val;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return levelMaxSum;
};