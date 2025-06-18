// 2025/06/18
// O(n) time complexity
// O(n) space complexity
// Time to complete: 22:04 min
// Patterns: Binary Tree DFS
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
var boundaryOfBinaryTree = function (root) {
  function buildLeftBoundary(node, boundary) {
    if (!node || (!node.left && !node.right)) {
      return;
    }

    boundary.push(node.val);
    if (node.left) {
      buildLeftBoundary(node.left, boundary);
    } else if (node.right) {
      buildLeftBoundary(node.right, boundary);
    }
  }

  function buildRightBoundary(node, boundary) {
    if (!node || (!node.left && !node.right)) {
      return;
    }

    if (node.right) {
      buildRightBoundary(node.right, boundary);
    } else if (node.left) {
      buildRightBoundary(node.left, boundary);
    }
    boundary.push(node.val);
  }

  function buildLeaves(node, boundary) {
    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      boundary.push(node.val);
    } else {
      buildLeaves(node.left, boundary);
      buildLeaves(node.right, boundary);
    }
  }

  const boundary = [root.val];
  buildLeftBoundary(root.left, boundary);
  buildLeaves(root.left, boundary);
  buildLeaves(root.right, boundary);
  buildRightBoundary(root.right, boundary);

  return boundary;
};