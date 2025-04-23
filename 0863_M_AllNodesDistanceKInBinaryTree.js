// 2025/04/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: OT 1:22:09 (abort) min, OT 1:34:00 (finished) min
// Patterns: DFS
// Notes w.r.t. solution:
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  // DFS
  //  Get target depth
  // DFS
  //  if below (param), dist = depth - target depth
  //  if above (being returned), dist = target depth - depth
  //  else if above on one side, re-do other side, dist = target depth + depth

  const nodesAtK = [];

  function dfs(node, distance = Infinity) {
    if (node === null || (distance !== Infinity && distance > k)) {
      return distance;
    }

    if (node === target) {
      distance = 0;
    }

    if (distance !== Infinity) {
      if (distance === k) {
        nodesAtK.push(node.val);
      } else if (distance < k) {
        dfs(node.left, distance + 1);
        dfs(node.right, distance + 1);
      }
    } else {
      distance = dfs(node.left, distance + 1);
      if (distance !== Infinity) {
        dfs(node.right, distance + 1);
      } else {
        distance = dfs(node.right, distance + 1);
        dfs(node.left, distance + 1);
      }

      if (distance === k) {
        nodesAtK.push(node.val);
      }
    }

    return distance + 1;
  }

  dfs(root);

  return nodesAtK;
};