// O(n) time complexity
// O(n) space complexity
// Time to complete: 12:10 min
// Patterns: Binary Tree - BFS
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
 * @return {number[][]}
 */
var verticalOrder = function (root) {
  // Looks like a BFS w/ +/- offset from origin 0
  // BFS -1 for left child, +1 for right child
  // Add nodes for +/- offset in array of correct bucket
  // Perhaps have one array of arrays for negative, & another for >= 0 & splice at end

  if (!root) {
    return [];
  }

  const negativeNodes = [];
  const positiveNodes = [];

  let currRow = [[root, 0]];
  while (currRow.length) {

    const nextRow = [];
    for (let i = 0; i < currRow.length; i++) {
      const [node, offset] = currRow[i];

      if (offset < 0) {
        negativeNodes[Math.abs(offset) - 1] ??= [];
        negativeNodes[Math.abs(offset) - 1].push(node.val);
      } else {
        positiveNodes[offset] ??= [];
        positiveNodes[offset].push(node.val);
      }

      if (node.left) {
        nextRow.push([node.left, offset - 1]);
      }

      if (node.right) {
        nextRow.push([node.right, offset + 1]);
      }
    }
    currRow = nextRow;
  }

  return negativeNodes.reverse().concat(positiveNodes);
};