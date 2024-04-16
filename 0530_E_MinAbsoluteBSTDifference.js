// O(n * log(n)) time complexity
// O(h) -> O(n) space complexity
// where h = depth of tree, 2 = # nodes in tree
// Time to complete: 5:42 min
// Patterns: BST
// Notes w.r.t. solution: DFS Preorder Traversal, Iterative
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
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let minDiff = Infinity;

  let stack = [root];

  while (stack.length) {
    const node = stack.pop();

    if (node.left) {
      let maxNode = node.left;
      while (maxNode.right) {
        maxNode = maxNode.right;
      }

      minDiff = Math.min(minDiff, Math.abs(node.val - maxNode.val));

      stack.push(node.left);
    }

    if (node.right) {
      let minNode = node.right;
      while (minNode.left) {
        minNode = minNode.left;
      }

      minDiff = Math.min(minDiff, Math.abs(node.val - minNode.val));

      stack.push(node.right);
    }
  }

  return minDiff;
};


// O(n) time complexity
// O(h) -> O(n) space complexity
// where h = depth of tree, 2 = # nodes in tree
// Time to complete: 14:00 min
// Patterns: BST
// Notes w.r.t. solution: Inorder Traversal.

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
 * @return {number}
 */
var getMinimumDifference = function (root) {
  if (!root || (!root.left && !root.right)) {
    return Infinity;
  }

  let minLeft = Infinity;
  if (root.left) {
    let rootChild = root.left;
    while (rootChild.right) {
      rootChild = rootChild.right;
    }
    minLeft = Math.min(Math.abs(root.val - rootChild.val), getMinimumDifference(root.left))
  }

  let minRight = Infinity;
  if (root.right) {
    let rootChild = root.right;
    while (rootChild.left) {
      rootChild = rootChild.left;
    }
    minRight = Math.min(Math.abs(root.val - rootChild.val), getMinimumDifference(root.right))
  }

  return Math.min(minLeft, minRight);
};