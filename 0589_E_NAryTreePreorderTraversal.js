// 2024/04/19
// Iteration strategy
// O(n) time complexity
// O(n) space complexity
// Time to complete: 8:08 min
// Patterns: DFS Inorder iteration
// Notes w.r.t. solution:
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  // DFS pre-order
  const stack = [root];
  const output = [];

  while (stack.length) {
    const node = stack.pop();
    if (node) {
      output.push(node.val);

      if (node.children) {
        for (let i = node.children.length - 1; 0 <= i; i--) {
          stack.push(node.children[i]);
        }
      }
    }
  }

  return output;
};

// 2023/05
// Iteration strategy
// O(n) time complexity
// O(n) space complexity
// Time to complete: 2 min
// Patterns: DFS Preorder Traversal w/ iteration
// Notes w.r.t. solution:
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  if (!root) {
    return [];
  }
  const values = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    values.push(node.val);
    queue.unshift(...node.children);
  }
  return values;
};

// 2023/05
// Recursion strategy
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3 min
// Patterns: DFS Preorder Traversal w/ Recursion
// Notes w.r.t. solution:
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  const values = [];
  return preOrderRecursive(root, values);
};

function preOrderRecursive(root, values) {
  if (root === null) {
    return values;
  }
  values.push(root.val);
  root.children.forEach((child) => values = preOrderRecursive(child, values));
  return values;
}