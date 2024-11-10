// 2024/11/10
// O(n) time complexity
// O(n) space complexity
// Time to complete: 19:02 min
// Patterns: Hashmap
// Notes w.r.t. solution: Lost a lot of time forgetting that implicit hashmap string key conversion of an object is [Object object].
//  This needs to be explicityly constructed for nested objects.
//  Was nice on myself & dropped the time spend debugging that derp.
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const subtrees = {};
  const dupSubtrees = {};

  function addDuplicateSubtrees(node) {
    if (!node) {
      return 'null';
    }

    const left = addDuplicateSubtrees(node.left);
    const right = addDuplicateSubtrees(node.right);
    const key = `${node.val}, ${left}, ${right}`;

    if (subtrees[key]) {
      dupSubtrees[key] = node;
    } else {
      subtrees[key] = node;
    }

    return key;
  }

  addDuplicateSubtrees(root);

  return Object.values(dupSubtrees);
};