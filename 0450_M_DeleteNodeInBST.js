// 2024/10/11
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 1:30:00 min
// Patterns: Binary Search Tree, Preorder DFS w/ iteration
// Notes w.r.t. solution: Iteration is WAY harder, more complex & error prone than recrsion :-P
//   90% Solved in time, but debugging took the rest.
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  const sentinel = { right: root }

  // Find node to delete & it's parent
  let parent = sentinel;
  let target = root;
  while (target && target.val !== key) {
    parent = target;
    target = target.val < key ? target.right : target.left;
  }

  if (!target) {
    return root;
  }

  // If leaf, just remove
  let child = null;

  if (target.left && target.right) {
    // If target has 2 children, get first first inorder predeccesor
    // right-most from left branch (if present)
    let prev = target;
    let predecessor = target.left;
    while (predecessor.right) {
      prev = predecessor;
      predecessor = predecessor.right
    }

    // Disconnect predecessor && attach target children to predecessor
    predecessor.right = target.right;
    if (prev === target) {
      // Predecessor is left child of target
      prev.left = predecessor.left;
    } else {
      // Predecessor is on a right branch of the left child of target
      prev.right = predecessor.left;
      predecessor.left = target.left;
    }

    child = predecessor;
  } else {
    // If target has one child, just swap
    child = (target.left && !target.right) ? target.left : target.right;
  }

  // Disconnect target children
  target.left = null;
  target.right = null;

  // Disconnect target
  if (parent.left?.val === key) {
    parent.left = child;
  } else if (parent.right?.val === key) {
    parent.right = child;
  }

  return sentinel.right;
};

// 2023/06
// O(log(n)) time complexity
// O(log(n)) space complexity
// Time to complete: 15:00 min
// Patterns: Binary Search Tree, Preorder DFS w/ Recursion
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) {
    return root;
  }

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    if (root.left === null && root.right === null) {
      return null;
    } else if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      let successorParent = root;
      let successor = root.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent === root) {
        successorParent.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }

      root.val = successor.val;
    }
  }

  return root;
};
