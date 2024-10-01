// 2024/10/01
// O(n) time complexity
// O(1) space complexity
// Time to complete: 10:20 min
// Patterns: Binary Tree, BFS
// Notes w.r.t. solution: Solving for additional constraint of constant space.
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
  while (leftmost && leftmost.left !== null) {
    // Process row
    let head = leftmost;
    while (head !== null) {
      head.left.next = head.right;

      if (head.next) {
        head.right.next = head.next.left;
      }

      head = head.next;
    }

    // Move to next row
    leftmost = leftmost.left;
  }

  return root;
};

// 2024/10/01
// O(n) time complexity
// O(n) space complexity
// Time to complete: 11:49 min
// Patterns: Binary Tree, BFS
// Notes w.r.t. solution: Solved in 8 min but forgot to process last row. Doh!
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
  function linkRow(row) {
    for (let i = 1; i < row.length; i++) {
      const prevNode = row[i - 1];
      const nextNode = row[i];
      prevNode.next = nextNode;
    }
  }

  let row = [];
  const queue = [root, null];
  while (queue.length) {
    const node = queue.shift();

    if (node === null) {
      if (queue.length && queue[0] !== null) {
        linkRow(row);
        row = [];
        queue.push(null);
      }
    } else {
      row.push(node);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  linkRow(row);

  return root;
};
