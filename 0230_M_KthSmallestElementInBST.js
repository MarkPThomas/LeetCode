// 2025/02/24
// O(h + k) time complexity
// O(h) space complexity
//  where h = height of tree, ranging from n (unbalanced) to log(n) (balanced)
// Time to complete: NA min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Better Iterative solution, from editorial
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  // DFS In-Order traversal, count k
  const stack = [];
  while (true) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();
    k--;
    if (!k) {
      return root.val;
    }

    root = root.right;
  }
};

// 2025/02/24
// O(h + k) time complexity
// O(h) space complexity
//  where h = height of tree, ranging from n (unbalanced) to log(n) (balanced)
// Time to complete: NA min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Iterative solution, refactored from recursive
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  // DFS In-Order traversal, count k
  const visited = {};
  const stack = [root];
  while (stack.length) {
    const node = stack[stack.length - 1];
    if (!node) {
      stack.pop();
      continue;
    }

    if (node.left && !visited[node.left.val]) {
      stack.push(node.left);
      continue;
    }

    stack.pop();
    k--;
    if (!k) {
      return node.val;
    }
    visited[node.val] = true;

    if (node.right && !visited[node.right.val]) {
      stack.push(node.right);
    }
  }

  return -Infinity;
};

// 2025/02/24
// O(h + k) time complexity
// O(h) space complexity
//  where h = height of tree, ranging from n (unbalanced) to log(n) (balanced)
// Time to complete: 11:01 min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Recursive solution
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  // DFS In-Order traversal, count k
  let kthSmall = null;

  function dfs(node) {
    if (!node) {
      return;
    }

    dfs(node.left);
    if (!k) {
      return;
    }

    k--;
    if (!k) {
      kthSmall = node.val;
      return;
    }

    dfs(node.right);
  }

  dfs(root);
  return kthSmall;
};