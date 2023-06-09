// O(T1 + T2) time complexity
// O(T1 + T2) space complexity
// where T1 = length of tree 1, T2 = length of tree 2
// Time to complete: 8:00 min
// Patterns: Binary Tree DFS Preorder Traversal
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const leavValueSequence1 = leafValueSequence(root1);
  const leavValueSequence2 = leafValueSequence(root2);

  const length = Math.min(leavValueSequence1.length, leavValueSequence2.length);
  for (let i = 0; i < length; i++) {
    if (leavValueSequence1[i] !== leavValueSequence2[i]) {
      return false;
    }
  }
  return leavValueSequence1.length === leavValueSequence2.length;
};

function leafValueSequence(root, sequence = []) {
  // DFS preorder search
  if (!root.left && !root.right) {
    sequence.push(root.val);
  } else {
    if (root.left) {
      sequence = leafValueSequence(root.left, sequence);
    }
    if (root.right) {
      sequence = leafValueSequence(root.right, sequence);
    }
  }
  return sequence;
}