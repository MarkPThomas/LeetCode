// O(n) time complexity
// O(n) space complexity
// Time to complete: 32:52 min
// Patterns: Binary Tree, DFS Postorder, DFS Inorder
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  const inOrderMap = {};
  for (let i = 0; i < inorder.length; i++) {
    inOrderMap[inorder[i]] = i;
  }

  let postIdx = postorder.length - 1;

  function buildChildren(leftIdx, rightIdx) {
    // At leaf
    if (leftIdx > rightIdx) {
      return null;
    }

    const rootVal = postorder[postIdx];
    const root = new TreeNode(rootVal);

    // Inorder root
    const rootIdx = inOrderMap[rootVal];

    // Increment postIdx backwards & build children in reverse
    postIdx--;
    root.right = buildChildren(rootIdx + 1, rightIdx);
    root.left = buildChildren(leftIdx, rootIdx - 1);

    return root;
  }

  let leftIdx = 0;
  let rightIdx = inorder.length - 1;
  return buildChildren(leftIdx, rightIdx, postIdx);
}