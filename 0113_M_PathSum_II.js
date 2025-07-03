// 2025/01/19
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Tree DFS, Backtracking
// Notes w.r.t. solution: Converted to recursion. Clearly much faster & more memory efficient.
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  if (!root) {
    return [];
  }

  const pathSums = [];

  function backtrack(node, prevSum, prevPath) {
    if (node === null) {
      return;
    }

    prevPath.push(node.val);

    const sum = prevSum + node.val;
    if (!node.left && !node.right && sum === targetSum) {
      pathSums.push([...prevPath]);
    } else {
      backtrack(node.left, sum, prevPath);
      backtrack(node.right, sum, prevPath);
    }

    prevPath.pop();
  }

  backtrack(root, 0, [])

  return pathSums;
};

// 2025/01/19
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 15:32 min
// Patterns: Tree DFS, Backtracking
// Notes w.r.t. solution: Less efficient w/ array copying for iterative backtracking. Recursion works better.
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  if (!root) {
    return [];
  }

  const pathSums = [];

  const stack = [[root, 0, []]];
  while (stack.length) {
    const [node, prevSum, prevPath] = stack.pop();

    prevPath.push(node.val);

    const sum = prevSum + node.val;
    if (!node.left && !node.right) {
      if (sum === targetSum) {
        pathSums.push(prevPath);
      }
      continue;
    }

    if (node.left) {
      stack.push([node.left, sum, [...prevPath]]);
    }

    if (node.right) {
      stack.push([node.right, sum, [...prevPath]]);
    }
  }

  return pathSums;
};