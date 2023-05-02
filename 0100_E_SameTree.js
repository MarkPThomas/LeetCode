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
var isSameTree = function (p, q) {
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
var isSameTree = function (p, q) {
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