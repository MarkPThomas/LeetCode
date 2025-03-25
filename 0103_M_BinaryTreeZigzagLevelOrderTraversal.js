// 2024/03/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 19:50 min
// Patterns: Tree BFS
// Notes w.r.t. solution: Solved in 6:49 but had ordering of adding/processing being confusing.
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {

  let leftToRight = true;
  let vals = [];
  let level = [root];
  while (level.length) {

    const levelVals = [];
    if (leftToRight) {
      for (let i = 0; i < level.length; i++) {
        const node = level[i];
        if (!node) {
          continue;
        }
        levelVals.push(node.val);
      }
    } else {
      for (let i = level.length - 1; i >= 0; i--) {
        const node = level[i];
        if (!node) {
          continue;
        }
        levelVals.push(node.val);
      }
    }

    leftToRight = !leftToRight;
    if (levelVals.length) {
      vals.push(levelVals);
    }

    const nextLevel = [];
    for (let i = 0; i < level.length; i++) {
      const node = level[i];
      if (!node) {
        continue;
      }
      nextLevel.push(node.left);
      nextLevel.push(node.right);
    }

    level = nextLevel;
  }

  return vals;
};