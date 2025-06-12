// 2025/06/11
// O(n + m) time complexity
// O(n) space complexity
//  where n = # nodes in tree1, m = # nodes in tree2
// Time to complete: 25:11 (5:51) min
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Spent 19:20 on wrong solution. 5:51 after starting over for 'brute force' solution.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function (root1, root2, target) {

  // BST traverse of tree1, store target - vals in hashmap
  const tree1Targets = new Set();

  const visited1 = new Set();
  const tree1 = [root1];
  while (tree1.length) {
    let node = tree1.pop();
    while (node.left && !visited1.has(node.left.val)) {
      tree1.push(node);
      node = node.left;
    }

    // Process
    tree1Targets.add(target - node.val);
    visited1.add(node.val);

    if (node.right && !visited1.has(node.right.val)) {
      tree1.push(node.right);
    }
  }

  // BST traversa of tree 1, checking hashmap
  const visited2 = new Set();
  const tree2 = [root2];
  while (tree2.length) {
    let node = tree2.pop();
    while (node.left && !visited2.has(node.left.val)) {
      tree2.push(node);
      node = node.left;
    }

    // Process
    if (tree1Targets.has(node.val)) {
      return true;
    }
    visited2.add(node.val);

    if (node.right && !visited2.has(node.right.val)) {
      tree2.push(node.right);
    }
  }

  return false;
};