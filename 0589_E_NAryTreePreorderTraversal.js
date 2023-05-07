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