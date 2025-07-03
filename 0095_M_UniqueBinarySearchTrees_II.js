// 2024/08/29
// O(cannot derive) time complexity - too hard!
// O(cannot) space complexity - too hard!
// Time to complete: 37:46 min
// Patterns: DP, Memoization, Recursion, BST
// Notes w.r.t. solution: Solved in 28:42, then had to clean up.
//    Snuck peak at solution & I was 99% there, except more messy & no memoization.
//    Could perhaps have gotten it & faster if a bit slower planning out?
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  const memo = {};

  function allPossibleBST(start, end) {
    const trees = [];
    if (start > end) {
      trees.push(null);
      return trees;
    }

    const key = `${start}, ${end}`;
    if (memo[key]) {
      return memo[key];
    }

    for (let i = start; i <= end; i++) {
      const allLeftBSTs = allPossibleBST(start, i - 1);
      const allRightBSTs = allPossibleBST(i + 1, end);

      for (let left = 0; left < allLeftBSTs.length; left++) {
        for (let right = 0; right < allRightBSTs.length; right++) {
          const node = {
            val: i,
            left: allLeftBSTs[left],
            right: allRightBSTs[right]
          }

          trees.push(node);
        }
      }
    }

    memo[key] = trees;

    return trees;
  }

  return allPossibleBST(1, n);
};
