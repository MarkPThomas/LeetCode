// 2024/03/27
// O(n) time complexity
// O(n) space complexity
// where n = min # of nodes between trees p & q
// Time to complete: 10:27 min
// Patterns: Binary Tree BFS
// Notes w.r.t. solution: Solved in 5:10, took to 10:27 to debug a minor issue of breaking out of the loop.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree2024 = function (p, q) {
  let pNodes = [p];
  let qNodes = [q];

  while (pNodes.length && qNodes.length) {
    const pNode = pNodes.shift();
    const qNode = qNodes.shift();

    if ((pNode === null && qNode === null)) {
      continue;
    }

    if ((pNode && !qNode) ||
      (!pNode && qNode) ||
      (pNode.val !== qNode.val)) {
      return false;
    }

    pNodes.push(pNode.left);
    pNodes.push(pNode.right);
    qNodes.push(qNode.left);
    qNodes.push(qNode.right);
  }

  return pNodes.length === 0 && qNodes.length === 0;
};


// 2023/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6 min, would have been faster but had to debug handling null correctly
// Patterns: Tree BFS Iteration
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree2023 = function (p, q) {
  const queueA = [p];
  const queueB = [q];

  while (queueA.length && queueB.length) {
    const nodeA = queueA.shift();
    const nodeB = queueB.shift();

    if (nodeA === null && nodeB === null) {
      continue;
    }
    if (nodeA === null || nodeB === null || nodeA.val !== nodeB.val) {
      return false;
    }

    queueA.push(nodeA.left);
    queueA.push(nodeA.right);
    queueB.push(nodeB.left);
    queueB.push(nodeB.right);
  }
  return true;
};

// 2022
// O(n) time complexity
// O(n) space complexity
// Time to complete: 5 min
// Patterns: Tree Preorder DFS
// Notes w.r.t. solution: Seems to be faster in Leetcode runs than iterative solution. Certainly easier to read.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree2022 = function (p, q) {
  // check node
  if (p === null && q === null) {
    return true;
  }
  if (q === null || p === null || p.val !== q.val) {
    return false;
  }
  // check children
  return isSameTree(p.left, q.left)
    && isSameTree(p.right, q.right);
};