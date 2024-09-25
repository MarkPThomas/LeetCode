// 2024/09/24
// O(n) time complexity
// O(n) space complexity
// Time to complete: 16:28 min
// Patterns: BFS, N-ary Tree, Inorder Traverse
// Notes w.r.t. solution:
/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const out = [];
  let row = [];
  const END_ROW = 'end';

  const queue = [root, null, END_ROW];
  while (queue.length) {
    const node = queue.shift();

    if (node === END_ROW) {
      if (row.length) {
        out.push([...row]);
        row = [];
      }

      if (queue.length) {
        queue.push(END_ROW);
      }
    } else if (node) {
      row.push(node.val);
      for (const child of node.children) {
        queue.push(child);
      }
      queue.push(null);
    }
  }

  return out;
};