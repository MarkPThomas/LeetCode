// 2023/05/?
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

// 2024/02/27 - Optimized solution
// O(T1) time complexity
// O(T1) space complexity
// where T1 = length of tree 1
// Time to complete: 15 min... not doing the simplest solution, but optimized
// Patterns: Binary Tree DFS Preorder Traversal with Stacks
// Notes w.r.t. solution: Rather than comparing 2 lists from separate DFS, I only made a list from the
//    first tree, and then 'unraveled' it doing a reversed DFS on tree 2.
//    I also added short-circuiting mechanisms throughout, such as first mismatch, or as soon as T2 had more leaves.
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
var leafSimilar20240227 = function (root1, root2) {
  const sequence = [];
  getLeafSequence(root1, sequence);

  const result = checkLeafSequence(root2, sequence);
  return result && sequence.length === 0;
};

var getLeafSequence = function (node, sequence) {
  if (!node.left && !node.right) {
    sequence.push(node.val);
  } else {
    if (node.left) {
      getLeafSequence(node.left, sequence);
    }
    if (node.right) {
      getLeafSequence(node.right, sequence);
    }
  }
}

var checkLeafSequence = function (node, sequence) {
  if (!node.left && !node.right) {
    if (sequence.length && node.val === sequence[sequence.length - 1]) {
      sequence.pop();
      return true;
    } else {
      return false;
    }
  } else {
    let result = true;
    if (node.right) {
      result = checkLeafSequence(node.right, sequence);
    }
    if (result && node.left) {
      result = checkLeafSequence(node.left, sequence);
    }
    return result;
  }
}