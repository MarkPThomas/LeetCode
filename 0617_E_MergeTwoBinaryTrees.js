// 2024/04/11
// O(m) time complexity
// O(m) space complexity
// where m = min # nodes between the trees
// Time to complete: 16:01 min
// Patterns: Binary Tree, BFS iterative
// Notes w.r.t. solution: Would have been around 10 min but thrown off by a minor bug (undefined entering queue)
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
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (!root2) {
    return root1;
  }

  if (!root1) {
    return root2;
  }

  const queue1 = [root1];
  const queue2 = [root2];

  while (queue1) {
    const node1 = queue1.shift();
    const node2 = queue2.shift();

    if (!node1) {
      break;
    } else {
      node1.val += node2.val;
    }

    if (!node1.left && node2.left) {
      node1.left = node2.left;
    } else if (node1.left && node2.left) {
      queue1.push(node1.left);
      queue2.push(node2.left);
    }

    if (!node1.right && node2.right) {
      node1.right = node2.right;
    } else if (node1.right && node2.right) {
      queue1.push(node1.right);
      queue2.push(node2.right);
    }
  }

  return root1;
};


// 2023/05
// O(m) time complexity
// O(m) space complexity
// where m = min # nodes overlapping between the 2 trees
// Time to complete: 13 min (6 min on aborted iterative solution, 7 min on recursive solution)
// Patterns: Binary Tree, Preorder DFS
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
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (root1 === null && root2 === null) {
    return null;
  } else if (!root2) {
    return root1;
  } else if (!root1) {
    return root2;
  }

  root1.val += root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
};