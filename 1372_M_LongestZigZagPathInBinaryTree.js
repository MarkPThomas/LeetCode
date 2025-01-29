// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: DFS - Postorder, Dynamic Programming
// Notes w.r.t. solution: Worked solution
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
 * @return {number}
 */
var longestZigZag = function (root) {
  let pathLength = 0;

  function dfs(node, goLeft, steps) {
    if (!node) {
      return;
    }

    pathLength = Math.max(pathLength, steps);

    // Accrue length or start new path?
    const leftLength = goLeft ? steps + 1 : 1;
    const rightLength = goLeft ? 1 : steps + 1;

    dfs(node.left, false, leftLength);
    dfs(node.right, true, rightLength);
  }

  dfs(root, true, 0);

  return pathLength;
};

// O(n) time complexity
// O(n) space complexity
// Time to complete: 43:47 min - 36/58
// Patterns: DFS - Postorder, Dynamic Programming
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
 * @param {TreeNode} root
 * @return {number}
 */
var longestZigZag = function (root) {
  // L vs. R depends in prev move
  // Each node can only be entered one way from the root
  // Therefore, the only node where you you can choose L/R is the root
  // Alternatively, the 'root', can be the starting node chosen
  // Zig-zag length is just the depth

  // Memo for each node as to the zig-zag length on the left vs. right
  // DFS to build up from leaves
  // Begin zig-zags at leaves, add to memo for node's zigzag lenght by branch
  // As we work up, we can re-use the memos
  // Node values are not unique -  maybe make the key the zig-zag path taken as a string?
  //  zigzags['RLRLLL] = {left, right}

  const LEFT = 'L';
  const RIGHT = 'R';
  const memo = {};
  let maxZigZag = 0;

  function getZigzagsFrom(node, path) {
    if (!node) {
      return -1;
    }

    const fromDir = path ? path[path.length - 1] : '';
    if (memo[path] && memo[path][fromDir]) {
      return memo[path][fromDir];
    }

    const length = fromDir === LEFT
      ? getZigzagsFrom(node.right, path + RIGHT)
      : getZigzagsFrom(node.left, path + LEFT);

    if (!(path in memo)) {
      memo[path] = {}
    }
    memo[path][fromDir] = length + 1;
    maxZigZag = Math.max(maxZigZag, memo[path][fromDir]);

    return memo[path][fromDir];
  }

  function getAllZigzags(node, path) {
    if (!node) {
      return;
    }

    getAllZigzags(node.left, path + LEFT);
    getAllZigzags(node.right, path + RIGHT);

    const rootPath = path.slice(0, path.length - 1);
    getZigzagsFrom(node, rootPath + LEFT);
    getZigzagsFrom(node, rootPath + RIGHT);
  }

  getAllZigzags(root, '0');

  return maxZigZag;
};