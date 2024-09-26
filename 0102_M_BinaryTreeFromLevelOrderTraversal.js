// 2024/09/26
// O(n) time complexity
// O(n) space complexity
// Time to complete: 5:25 min
// Patterns: BFS, Iteration
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
var levelOrder = function (root) {
  if (!root) {
    return [];

  }
  const output = [];
  let row = [];

  const nodes = [root, null];
  while (nodes.length) {
    const node = nodes.shift();

    if (node) {
      row.push(node.val);

      if (node.left) {
        nodes.push(node.left);
      }

      if (node.right) {
        nodes.push(node.right);
      }
    } else {
      output.push([...row]);
      row = [];

      if (nodes.length) {
        nodes.push(null);

      }
    }

  }

  return output;
};

// 2024/09/11
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7:30 min
// Patterns: BFS, Iteration
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
var levelOrder = function (root) {
  const values = [];
  if (!root) {
    return values;
  }

  const queue = [root, null]
  let rowValues = [];
  while (queue.length) {
    const node = queue.shift();

    if (!node) {
      values.push(rowValues);
      rowValues = [];
      if (queue.length && queue[queue.length - 1] !== null) {
        queue.push(null);
      }
    } else {
      rowValues.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return values;
};