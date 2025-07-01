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
// Patterns: Tree DFS
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

  function maxConsBranchLength(node, increment) {
    if (!node) {
      return [0, 0];
    }

    // Set both to 1 since we don't know which it will be yet
    let increase = 1;
    let decrease = 1;

    let [incrLeft, decrLeft] = maxConsBranchLength(node.left);
    if (node.left) {
      if (node.val - node.left.val === 1) {
        decrease = decrLeft + 1;
      } else if (node.val - node.left.val === -1) {
        increase = incrLeft + 1;
      }
    }

    let [incrRight, decrRight] = maxConsBranchLength(node.right);
    if (node.right) {
      if (node.val - node.right.val === 1) {
        decrease = Math.max(decrease, decrRight + 1);
      } else if (node.val - node.right.val === -1) {
        increase = Math.max(increase, incrRight + 1);
      }
    }

    // -1 to avoid double counting curr node if max is the subtree
    maxConsecutive = Math.max(maxConsecutive, decrease + increase - 1);

    return [increase, decrease];
  }

  maxConsBranchLength(root);
  maxConsBranchLength(root);

  return maxConsecutive;
};