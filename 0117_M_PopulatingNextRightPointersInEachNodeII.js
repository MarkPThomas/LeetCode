// 2024/10/22
// O(n) time complexity
// O(1) space complexity
// Time to complete: 32:45 min+++
// Patterns:  Binary Tree, BFS, Linked List
// Notes w.r.t. solution: Went OT twice & restarted before solving
/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
  let leftmost = root;
  let prev = null;
  let curr = null;
  while (leftmost) {
    curr = leftmost;
    leftmost = null;
    prev = null;

    while (curr) {
      [prev, leftmost] = processChild(curr.left, prev, leftmost);
      [prev, leftmost] = processChild(curr.right, prev, leftmost);
      curr = curr.next;
    }
  }

  return root;
};

function processChild(childNode, prev, leftmost) {
  if (childNode) {
    if (prev) {
      prev.next = childNode;
    } else {
      leftmost = childNode;
    }
    prev = childNode;
  }

  return [prev, leftmost];
}