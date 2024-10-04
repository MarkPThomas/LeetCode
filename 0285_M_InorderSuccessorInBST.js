// 2024/10/03
// O(n) time complexity
// O(n) space complexity
// Time to complete: NA - had to look at solution. Here for reference
// Patterns: BST, Inorder Traverse, using BST properties
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  let successor = null;
  while (root) {
    if (p.val >= root.val) {
      root = root.right;
    } else {
      successor = root;
      root = root.left;
    }
  }

  return successor;
};

// 2024/10/03
// O(n) time complexity
// O(n) space complexity
// Time to complete: 4:46 min
// Patterns: BST, Inorder Traverse
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  // Traverse inorderto first node after p
  let pFound = false;

  // Get leftmost node
  let node = root;
  const stack = [];
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }

    // process
    node = stack.pop();
    if (pFound) {
      return node;
    }
    if (node.val === p.val) {
      pFound = true;
    }

    node = node.right;
  }
};