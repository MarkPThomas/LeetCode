// 2024/04/28
// O(H) time complexity where H = height of binary tree
// O(1) space complexity
// Time to complete: 6:20 min
// Patterns: Binary Search Tree, DFS
// Notes w.r.t. solution: Found best solution!
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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  let node = root;
  let max = Infinity;
  let min = -Infinity;

  while (node) {
    if (node.val === target) {
      return target;
    } else if (target < node.val) {
      max = Math.min(max, node.val);
      node = node.left;
    } else {
      min = Math.max(min, node.val);
      node = node.right;
    }
  }

  return Math.abs(max - target) < Math.abs(target - min) ? max : min;
};

// 2024/01/19
// O(H) time complexity where H = height of binary tree
// O(1) space complexity
// Time to complete: 30:00 min, 2:00 extra to simplify code
// Patterns: Binary Search Tree
// Notes w.r.t. solution: Found best solution!

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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  if (root.val === target) {
    return target;
  }

  let closest = root.val;
  let closestAlt = null;

  while (root !== null) {
    const val = root.val;

    if (val === target) {
      return target;
    } else {
      const deltaClosest = Math.abs(target - closest);
      const deltaCurrent = Math.abs(target - val);
      if (deltaCurrent < deltaClosest) {
        closest = val;
        closestAlt = Infinity;
      } else if (deltaCurrent === deltaClosest) {
        closestAlt = val;
      }

      root = target < root.val ? root.left : root.right;
    }
  }

  return closestAlt !== null ? Math.min(closest, closestAlt) : closest;
};