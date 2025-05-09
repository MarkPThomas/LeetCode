// 2025/05/09
// O(n) time complexity
// O(n) space complexity
// Time to complete: 19:59 min
// Patterns: Binary Tree, Stack, Recursion
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
 * @param {string} s
 * @return {TreeNode}
 */
var str2tree = function (s) {
  const OPEN = '(';
  const CLOSE = ')';

  function buildChild(i) { // returns [node, i updated]
    let num = [s[i]]; // gets '-' or first int
    // Get remaining ints
    i++;
    while (i < s.length && s[i] !== OPEN && s[i] !== CLOSE) {
      num.push(s[i]);
      i++;
    }

    const node = new TreeNode(Number(num.join('')));

    if (s[i] === CLOSE) {
      return [node, i + 1];
    }

    if (s[i] === OPEN) {
      const [left, iNext] = buildChild(i + 1);
      node.left = left;
      i = iNext;
    }

    if (s[i] === OPEN) {
      const [right, iNext] = buildChild(i + 1);
      node.right = right;
      i = iNext;
    }

    return [node, i + 1];
  }

  return s.length ? buildChild(0)[0] : null;
};