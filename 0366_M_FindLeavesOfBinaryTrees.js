// 2025/06/15
// O(n) time complexity
// O(n) space complexity
// Time to complete: 15:06 min
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
 * @return {number[][]}
 */
var findLeaves = function (root) {
  // Collect each pass' leaves as a separate array
  // DFS Post-order
  //  L-R ad & disconnect

  function dfs(node, leaves) {
    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      leaves.push(node);
    } else {
      dfs(node.left, leaves);
      if (leaves[leaves.length - 1] === node.left) {
        node.left = null;
      }

      dfs(node.right, leaves);
      if (leaves[leaves.length - 1] === node.right) {
        node.right = null;
      }
    }
  }

  const allLeaves = [];
  while (root && (root.left || root.right)) {
    const leaves = [];
    dfs(root, leaves);
    allLeaves.push(leaves);
  }
  allLeaves.push([root]);

  for (let i = 0; i < allLeaves.length; i++) {
    for (let j = 0; j < allLeaves[i].length; j++) {
      allLeaves[i][j] = allLeaves[i][j].val;
    }
  }

  return allLeaves;
};