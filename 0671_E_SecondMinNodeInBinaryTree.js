// 2025/05/17
// O(n) time complexity
// O(n) space complexity
// Time to complete: 12:20 min
// Patterns: Binary Tree - DFS
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
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
  // smallest value is root
  // 2nd smallest value is smallest of:
  //  1. Non-equal child
  //  2. First non-equal child of equal child

  function getChildMin(root, val) {
    let minNext = Infinity;

    const stack = [root];
    while (stack.length) {
      const node = stack.pop();
      if (!node) {
        continue;
      }

      if (node.val > val) {
        minNext = Math.min(minNext, node.val);
      } else if (node.left) {
        stack.push(node.left);
        stack.push(node.right);
      }
    }

    return minNext;
  }

  let leftMin = getChildMin(root.left, root.val);
  let rightMin = getChildMin(root.right, root.val);
  const min2nd = Math.min(leftMin, rightMin);

  return min2nd === Infinity ? -1 : min2nd;
};