// Optimized: DFS w/ Recursion for Simplicity
// O(m * n) time complexity
// O(m + n) space complexity
// Time to complete: 6 min
// Patterns: Binary Tree, DFS, Recursion
// Notes w.r.t. solution: NOT EASY!! At least beyond naive solution.
// Example solutions include hashing comparisons & hard string comparison w/ serialization.
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  // Preorder DFS
  if (root === null) {
    return root === subRoot;
  }
  if (root.val === subRoot.val && isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(root1, root2) {
  // Preorder DFS
  if (root1 === null && root2 === null) {
    return true;
  } else if (root1 === null || root2 === null) {
    return false;
  }

  return root1.val === root2.val
    && isSameTree(root1.left, root2.left)
    && isSameTree(root1.right, root2.right);
}

// First try
// O(m * n) time complexity
// O(m + n) space complexity
// Time to complete: 34 min
// Patterns: Binary Tree, BFS Iteration
// Notes w.r.t. solution: NOT EASY!! At least beyond naive solution.
// Example solutions include hashing comparisons & hard string comparison w/ serialization.

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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  // Do BFS as a DFS strategy is more likely to hit nodes deeper in main tree than the subRoot
  const rootQueue = [root];
  while (rootQueue.length) {
    // Find matching root
    const rootNode = rootQueue.shift();
    if (rootNode === null) {
      continue;
    }

    if (rootNode.val === subRoot.val) {
      // Compare trees
      if (isSameTree(rootNode, subRoot)) {
        return true;
      }
    }
    rootQueue.push(rootNode.left);
    rootQueue.push(rootNode.right);
  }
  return false;
};

function isSameTree(root1, root2) {
  const root1Queue = [root1];
  const root2Queue = [root2];
  while (root2Queue.length) {
    const root1Node = root1Queue.shift();
    const root2Node = root2Queue.shift();

    if (root1Node === null && root2Node === null) {
      continue;
    } else if (root1Node === null || root2Node === null
      || root1Node.val !== root2Node.val) {
      return false;
    }
    root1Queue.push(root1Node.left);
    root2Queue.push(root2Node.left);

    root1Queue.push(root1Node.right);
    root2Queue.push(root2Node.right);
  }
  return true;
}