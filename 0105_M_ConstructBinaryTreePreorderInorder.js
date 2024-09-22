// 2024/09/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 29:30 min
// Patterns: Binary Tree, DFS Preorder, DFS Inorder
// Notes w.r.t. solution: Mostly solved it in 24 min.
//   Mistake in Preorder tripped me up on idx increment.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const inorderIdxs = {};
  for (let i = 0; i < inorder.length; i++) {
    inorderIdxs[inorder[i]] = i;
  }

  let preIdx = 0;
  function buildChildren(left, right) {
    if (left > right) {
      return null;
    }

    const root = new TreeNode(preorder[preIdx]);
    preIdx++;

    let inIdx = inorderIdxs[root.val];
    root.left = buildChildren(left, inIdx - 1);
    root.right = buildChildren(inIdx + 1, right);

    return root;
  }

  return buildChildren(0, inorder.length - 1);
};
