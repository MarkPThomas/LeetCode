// 2025/06/11
// O(m + n) time complexity
// O(m + n) space complexity
//  where m = # nodes in tree1, 2 = # nodes in tree2
// Time to complete: 25:11 (5:51) min
// Patterns: Binary Search Tree, Hashmap
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

// ====== Solution =====
// O(m + n) time complexity
// O(m + n) space complexity
//  where m = # nodes in tree1, 2 = # nodes in tree2
// Patterns: Binary Search Tree, 2-Pointer
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function (root1, root2, target) {

  // Traverse to leftmost node in tree1
  const tree1 = [];
  let node1 = root1;
  while (node1.left) {
    tree1.push(node1);
    node1 = node1.left;
  }

  // Traverse to rightmost node in tree2
  const tree2 = [];
  let node2 = root2;
  while (node2.right) {
    tree2.push(node2);
    node2 = node2.right;
  }

  while (node1 && node2) {
    if (node1.val + node2.val < target) { // pointer1++
      if (node1.right) { // Try right branch
        node1 = node1.right;

        while (node1.left) { // Go to end of leftmost branch if it exists
          tree1.push(node1);
          node1 = node1.left;
        }
      } else {    // Backtrackup tree
        node1 = tree1.pop();
      }

    } else if (node1.val + node2.val > target) { // pointer2--
      if (node2.left) { // Try left branch
        node2 = node2.left;

        while (node2.right) { // Go to end of rightmost branch if it exists
          tree2.push(node2);
          node2 = node2.right;
        }
      } else {    // Backtrackup tree
        node2 = tree2.pop();
      }

    } else {
      return true;
    }
  }

  return false;
};


// O(m * log(n)) time complexity
// O(log(n) + log(m)) space complexity
//  where m = # nodes in tree1, 2 = # nodes in tree2
// Patterns: Binary Search Tree, 2-Pointer
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function (root1, root2, target) {
  function binarySearch(node, target) {
    if (!node) {
      return false;
    } else if (node.val === target) {
      return true
    } else if (node.val > target) {
      return binarySearch(node.left, target);
    } else {
      return binarySearch(node.right, target);
    }
  }

  function dfs(node1, node2, target) {
    if (!node1) {
      return false;
    } else if (binarySearch(node2, target - node1.val)) {
      return true;
    } else {
      return dfs(node1.left, node2, target) || dfs(node1.right, node2, target);
    }
  }

  return dfs(root1, root2, target);
};