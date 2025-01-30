// O(n) time complexity
// O(n) space complexity
// Time to complete: 8:18 min / 10:35 min after refactor to stack
// Patterns: Tree DFS
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
var goodNodes = function (root) {
  // node val >= prev nodes & >= root
  // pass prev value to children to assess good
  // if not good, pass along prev value, else update to curr

  let count = 0;
  const stack = [[root, root.val]];
  while (stack.length) {
    let [node, prevX] = stack.pop();

    if (!node) {
      continue;
    }

    if (prevX <= node.val) {
      count++;
      prevX = Math.max(prevX, node.val);
    }

    stack.push([node.left, prevX]);
    stack.push([node.right, prevX]);
  }

  return count;
};

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
var goodNodes = function (root) {
  // node val >= prev nodes & >= root
  // pass prev value to children to assess good
  // if not good, pass along prev value, else update to curr

  let count = 0;
  function getGoodNodes(node, prevX) {
    if (!node) {
      return;
    }

    if (prevX <= node.val) {
      count++;
      prevX = Math.max(prevX, node.val);
    }

    getGoodNodes(node.left, prevX);
    getGoodNodes(node.right, prevX);
  }

  getGoodNodes(root, root.val);

  return count;
};