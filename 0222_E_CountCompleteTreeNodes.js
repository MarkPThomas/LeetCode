// O() time complexity
// O() space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:

// 2024/08/16 - Naiive solution
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:03 min
// Patterns: Binary Tree, BFS
// Notes w.r.t. solution: This is the O(n) naiive solution.
//   Timed out with the faster (medium/hard) solution. Re-solve later

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
var countNodes = function (root) {
  if (!root) {
    return 0;
  }

  let count = 0;
  const nodes = [root];
  while (nodes.length) {
    const node = nodes.pop();
    count++;

    if (node.left) {
      nodes.push(node.left);
    }
    if (node.right) {
      nodes.push(node.right);
    }
  }

  return count;
};