// 2025/07/01
// O(n) time complexity
// O(n) space complexity
// Time to complete: 30:02 min @ 123/157
// Patterns: Tree DFS
// Notes w.r.t. solution: Was close! Just hadn't realized that I should track inc/dcr as the return pair,
//   or how to consider subtree vs. branches with them.
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
var longestConsecutive = function (root) {
  // DFS
  // Check left branch, right branch
  // Check combined branches
  let maxConsecutive = 0;

  function maxConsBranchLength(node, sign) {
    if (!node) {
      return 0;
    }

    let lengthLeft = maxConsBranchLength(node.left, sign);
    let lengthRight = maxConsBranchLength(node.right, sign);

    let lengthSubtree = 0;
    if (node.left && node.right
      && Math.abs(node.left.val - node.val) === 1
      && Math.abs(node.right.val - node.val) === 1
      && Math.abs(node.right.val - node.left.val) === 2) {
      lengthSubtree = lengthLeft + lengthRight;
    }

    if (node.left && node.left.val - node.val !== 1 * sign) {
      lengthLeft = 0;
    }

    if (node.right && node.right.val - node.val !== 1 * sign) {
      lengthRight = 0;
    }

    maxConsecutive = Math.max(maxConsecutive,
      Math.max(lengthLeft, lengthRight, lengthSubtree) + 1);

    return Math.max(lengthLeft, lengthRight) + 1;
  }

  maxConsBranchLength(root, 1);
  maxConsBranchLength(root, -1);

  return maxConsecutive;
};


// ==== Solution =====
// O(n) time complexity
// O(n) space complexity
// Patterns: Tree DFS Postorder
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
var longestConsecutive = function (root) {

  function maxConsBranchLength(node, longest) {
    if (!node) {
      return [0, 0, longest];
    }

    const [incrLeft, decrLeft, longestLeft] = maxChildBranch(node.left, node, longest);
    const [incrRight, decrRight, longestRight] = maxChildBranch(node.right, node, longest);

    const increase = Math.max(incrLeft, incrRight) + 1;
    const decrease = Math.max(decrLeft, decrRight) + 1;

    // -1 to avoid double counting curr node if max is the subtree
    longest = Math.max(longestLeft, longestRight, decrease + increase - 1);

    return [increase, decrease, longest];
  }

  function maxChildBranch(child, parent, longest) {
    let increase = 0;
    let decrease = 0;

    const [incr, decr, longestUpd] = maxConsBranchLength(child, longest);
    if (child) {
      const delta = parent.val - child.val;
      if (delta === 1) {
        decrease = decr;
      } else if (delta === -1) {
        increase = incr;
      }
    }

    return [increase, decrease, longestUpd];
  }

  return maxConsBranchLength(root, 0)[2];
};