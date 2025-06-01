// 2025/06/01
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 16:18 min
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
var verticalTraversal = function (root) {
  // BFS to get offsets
  // Store in order of min->max offset
  // 1 final pass, sort elements where > 1 in placeholder
  const nodesByOffset = {};

  let row = [[root, 0]];
  while (row.length) {
    const rowOffsets = {};

    const nextRow = [];
    for (let i = 0; i < row.length; i++) {
      const [node, offset] = row[i];
      if (!node) {
        continue;
      }

      rowOffsets[offset] ??= [];
      rowOffsets[offset].push(node.val);

      nextRow.push([node.left, offset - 1]);
      nextRow.push([node.right, offset + 1]);
    }
    row = nextRow;

    // sort elements on same column of row & add to list
    for (const [offset, vals] of Object.entries(rowOffsets)) {
      vals.sort((a, b) => a - b);
      nodesByOffset[offset] ??= [];
      nodesByOffset[offset].push(...vals);
    }
  }

  // Sort by offset
  const result = [];
  const offsets = Object.keys(nodesByOffset).sort((a, b) => a - b);
  for (const offset of offsets) {
    result.push(nodesByOffset[offset]);
  }
  return result;
};