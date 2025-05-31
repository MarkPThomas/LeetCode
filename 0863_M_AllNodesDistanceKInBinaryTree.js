// 2025/05/31
// O(n) time complexity
// O(n) space complexity
// Time to complete: OT 49:11 min
// Patterns: DFS Postorder
// Notes w.r.t. solution: Mostly solved in 30:00, 32/57 @ 42:05, 36/57 @ 45:47 debugging minor mistakes.
//  Slow down a bit more before coding!
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
  // DFS to get target node & depth
  // 1. Same DFS can continue k more calls to find child nodes
  // 2. Same DFS, upon unwind, can search all roots <= k
  //      Continued search is for k - delta_target->root nodes down unvisited branch
  //      Better do use recursion rather than stack for post-DFS decision (DFS post-order)
  // we need to track depth -> 0 @ target? Pass as param, return distance from target

  const nodes = [];
  function dfs(node, dist) {
    if (!node) {
      return dist;
    }

    if (dist !== undefined) {   // Target has been found
      if (dist === k) {       // Save node & stop further calls
        nodes.push(node.val);
      } else if (dist < k) {  // Keep checking deeper
        dfs(node.left, dist + 1);
        dfs(node.right, dist + 1);
      }

      return Math.abs(dist - 1);  // Unwind distance
    } else if (node === target) {  // Target found, start checking deeper
      if (k === 0) {
        nodes.push(node.val);
        return 1;
      }

      // Check children & then unwind
      dfs(node.left, 1);
      dfs(node.right, 1);
      dist = 0;
    } else {    // Target not yet found
      const distLeft = dfs(node.left);
      if (distLeft !== undefined && distLeft <= k) { // Target in L branch
        if (distLeft === k) {
          nodes.push(node.val);
        } else {    // Check remainder of right branch
          dfs(node.right, distLeft + 1);
        }

        return Math.abs(distLeft + 1);  // Unwind distance
      } else {                        // Look for target in right branch
        const distRight = dfs(node.right);
        if (distRight !== undefined && distRight <= k) {  // Target in R branch
          if (distRight === k) {
            nodes.push(node.val);
          } else {    // Check remainder of left branch
            dfs(node.left, distRight + 1);
          }

          return Math.abs(distRight + 1);  // Unwind distance
        }
      }
    }

    return dist === undefined ? dist : Math.abs(dist - 1);  // Unwind distance
  }

  dfs(root);
  return nodes;
};

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