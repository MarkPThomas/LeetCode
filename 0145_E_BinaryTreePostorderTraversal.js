// 2024/05/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: N/A min - for reference!
// Patterns: DFS Postorder iteratice
// Notes w.r.t. solution: Recursion is WAY easier for this one
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
var postorderTraversal = function (root) {
  if (!root) {
    return [];
  }

  const output = [];
  const stack = [];
  while (root || stack.length) {
    // Go to left-most node
    while (root) {
      // Set right child to process next (i.e. after left), but before current
      if (root.right) {
        stack.push(root.right);
      }

      // Then set current parent to process next
      stack.push(root);
      root = root.left;
    }

    // Process left-most child
    root = stack.pop();

    // Check for right children first in order to go to deepest node
    if (stack.length && root.right === stack[stack.length - 1]) {
      // Swap current node to process after adding right children to process
      stack[stack.length - 1] = root;
      root = root.right;
    } else {
      // We're on the left-most leaf
      output.push(root.val);
      root = null;
    }
  }

  return output;
};


// 2024/05/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:37 min
// Patterns: DFS Postorder recursive
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
var postorderTraversal = function (root) {
  function dfs(root, output) {
    if (!root) {
      return output;
    }

    if (root.left) {
      dfs(root.left, output);
    }

    if (root.right) {
      dfs(root.right, output);
    }

    output.push(root.val);

    return output;
  }

  const output = [];
  return dfs(root, output);
};