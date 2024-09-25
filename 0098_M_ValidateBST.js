// 2024/09/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 9:48 min
// Patterns: BST, Iteration, inorder traverse
// Notes w.r.t. solution: Time includes recursion solution & then refactoring
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = -Infinity;

  const nodes = [];
  let node = root;
  while (node || nodes.length) {
    while (node) {
      nodes.push(node);
      node = node.left;
    }

    node = nodes.pop();
    if (node.val <= prev) {
      return false;
    }

    prev = node.val;
    node = node.right;
  }

  return true;
};

// 2024/09/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 5:21 min
// Patterns: BST, Recursion, inorder traverse
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prev = -Infinity;

  function inorderTraverse(node) {
    if (!node) {
      return true;
    }

    if (!inorderTraverse(node.left) || node.val <= prev) {
      return false;
    }

    prev = node.val;

    return inorderTraverse(node.right);
  }

  return inorderTraverse(root);
};

// 2024/09/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 9:51 min
// Patterns: BST, Iteration
// Notes w.r.t. solution: Time includes recursion solution & then refactoring
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  const nodes = [root];
  const minima = [null];
  const maxima = [null];

  while (nodes.length) {
    const node = nodes.pop();
    const min = minima.pop();
    const max = maxima.pop();

    if (!node) {
      continue;
    }

    if ((max !== null && max <= node.val) || min !== null && (node.val <= min)) {
      return false;
    }

    // Left child
    nodes.push(node.left);
    minima.push(min);
    maxima.push(node.val);

    // Right child
    nodes.push(node.right);
    minima.push(node.val);
    maxima.push(max);
  }

  return true;
};

// 2024/09/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6:05 min
// Patterns: BST, Recursion
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  function dfs(root, min, max) {
    if (!root) {
      return true;
    }

    if ((max !== null && max <= root.val) || min !== null && (root.val <= min)) {
      return false;
    }

    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max);
  }

  return dfs(root, null, null);
};


// O(n) time complexity
// O(n) space complexity
// Time to complete: 23:00 min
// Patterns: BST, DFS Inorder Traverse
// Notes w.r.t. solution: Wasted first half not just implementing a direct inorder traverse. A bit rusty on those.

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
 * @return {boolean}
 */
var isValidBST = function (root) {
  let prevNode = null;

  // Inorder DFS
  function dfs(root) {
    if (!root) {
      return true;
    }

    // Left child
    if (root.left && !dfs(root.left)) {
      return false;
    }

    // Current node
    if (prevNode && prevNode.val >= root.val) {
      return false;
    }
    prevNode = root;

    // Right child
    if (root.right && !dfs(root.right)) {
      return false;
    }

    return true;
  }

  return dfs(root);
};