// O(n) time complexity
// O(n) space complexity
// Time to complete: 33:00 min
// Patterns: DFS - Binary Tree
// Notes w.r.t. solution: Would have been faster, hit refactored solution first, if I was slower
//    & more methodical in laying out the complete steps and then working out implementation

// Refactored faster solution
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let commonAncestor = null;

  // DFS preorder
  function dfs(root, p, q) {
    if (!root) {
      return false;
    }

    let isNode = (root.val === p.val || root.val === q.val);
    let isLeftChild = dfs(root.left, p, q);
    let isRightChild = dfs(root.right, p, q);

    if ((isLeftChild && isRightChild)
      || (isNode && isLeftChild)
      || (isNode && isRightChild)) {
      commonAncestor = root;
    }

    return isNode || isLeftChild || isRightChild;
  }

  dfs(root, p, q);
  return commonAncestor;
};


// First slow solution
// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val) {
//  *     this.val = val;
//  *     this.left = this.right = null;
//  * }
//  */
// /**
//  * @param {TreeNode} root
//  * @param {TreeNode} p
//  * @param {TreeNode} q
//  * @return {TreeNode}
//  */
// var lowestCommonAncestor = function (root, p, q) {
//   // DFS preorder
//   if (root.val === p.val || root.val === q.val) {
//     return root;
//   }

//   let leftChildP = isChild(root.left, p.val);
//   let rightChildQ = isChild(root.right, q.val);

//   if ((leftChildP && rightChildQ)
//     || (!leftChildP && !rightChildQ)) {
//     return root;
//   }

//   if (leftChildP && !rightChildQ) {
//     return lowestCommonAncestor(root.left, p, q);
//   }
//   if (!leftChildP && rightChildQ) {
//     return lowestCommonAncestor(root.right, p, q);
//   }
// };

// function isChild(root, value) {
//   if (!root) {
//     return false;
//   }

//   if (root.val === value) {
//     return true;
//   }

//   return (isChild(root.left, value) || isChild(root.right, value));
// }