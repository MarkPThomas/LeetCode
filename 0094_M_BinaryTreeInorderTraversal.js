// 2024/09/24
// O(n) time complexity
// O(n) space complexity
// Time to complete: 5:32 min
// Patterns: Binary Tree DFS Inorder, Iterative
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const output = [];
  const stack = [];

  let node = root;
  while (node || stack.length) {
    // get leftmost node
    while (node) {
      stack.push(node);
      node = node.left;
    }

    // Process
    node = stack.pop();
    output.push(node.val);

    // Check right branch
    node = node.right;
  }

  return output;
};

// 2024/09/24
// O(n) time complexity
// O(n) space complexity
// Time to complete: 2:24 min
// Patterns: Binary Tree DFS Inorder, Recursive
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const output = [];

  function recurse(root) {
    if (!root) {
      return;
    }

    recurse(root.left);
    output.push(root.val);
    recurse(root.right);
  }

  recurse(root);

  return output;
};

// 2024/05/15
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const values = [];
  const stack = [];
  let curr = root;

  // If not at null or if any processing left
  while (curr || stack.length) {
    // Fill stack up left-most branch
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    // Process stack at current level
    curr = stack.pop();
    values.push(curr.val);

    // Halt processing & check right branch
    curr = curr.right;
  }

  return values;
};

// 2023/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 1:00 min
// Patterns: Binary Tree DFS Inorder
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const values = [];
  dfsInOrder(root, values);
  return values;
};

function dfsInOrder(root, values) {
  if (!root) {
    return;
  }

  if (root.left) {
    dfsInOrder(root.left, values);
  }

  values.push(root.val);

  if (root.right) {
    dfsInOrder(root.right, values);
  }
}