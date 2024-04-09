// 2024/04/09 - Iterative
// O(log(n)) time complexity
// O(log(n)) space complexity for stack
// Time to complete:  10:12 min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Iterative solution. Brain is derp today.

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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  let node = root;

  while (node) {
    if (node.val === val) {
      return node;
    } else if (val < node.val) {
      node = node.left;
    } else if (val > node.val) {
      node = node.right;
    } else {
      return null;
    }
  }

  return null;
};

// 2023/06 - Iterative
// O(log(n)) time complexity
// O(1) space complexity for stack
// Time to complete:  2:00 min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Iterative solution

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
 * @param {number} val
 * @return {TreeNode}
 */
// ==== Original ====
// var searchBST = function (root, val) {
//   let node = root;
//   while (node) {
//     if (node.val === val) {
//       return node;
//     }

//     if (val < node.val) {
//       node = node.left;
//     } else {
//       node = node.right;
//     }
//   }
//   return null;
// };

// ==== Further refactoring ====
var searchBST = function (root, val) {
  while (root !== null && root.val !== val) {
    root = val < root.val ? root.left : node = root.right;
  }
  return root;
};


// 2023/06 - Recursion
// O(log(n)) time complexity
// O(log(n)) space complexity for stack
// Time to complete: 1:00 min
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST2023 = function (root, val) {
  if (!root) {
    return null;
  }
  if (root.val === val) {
    return root;
  }
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
};
