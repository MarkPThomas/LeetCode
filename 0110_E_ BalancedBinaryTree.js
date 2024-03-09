// 2024/03
// O(n) time complexity
// O(h) -> O(n) if tree is very unbalanced space complexity
// where h = height of binary tree, n = # nodes
// Time to complete: 26:50 min
// Patterns: DFS, Binary Trees, Bottom-Up Recursion (more efficient than prior solution)
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
 * @return {boolean}
 */
var isBalanced202403 = function (root) {
  if (!root || (!root.left && !root.right)) {
    return true;
  }

  const isBalancedLeft = height202403(root.left);
  const isBalancedRight = height202403(root.right);

  if (isBalancedLeft === false || isBalancedRight === false) {
    return false;
  } else {
    return (Math.abs(isBalancedLeft - isBalancedRight) <= 1);
  }
};

// A height-balanced binary tree is a binary tree in which
// the depth of the two subtrees
// of every node never differs by more than one.

var height202403 = function (root) {
  if (!root) {
    return 0;
  }

  if (!root.left && !root.right) {
    return 1;
  }

  const isBalancedLeft = height202403(root.left);
  const isBalancedRight = height202403(root.right);

  if (isBalancedLeft === false || isBalancedRight === false) {
    return false;
  } else {
    if (Math.abs(isBalancedLeft - isBalancedRight) <= 1) {
      return Math.max(isBalancedLeft, isBalancedRight) + 1;
    } else {
      return false;
    }
  }
}


// 2023/04
// O(n * log(n)) time complexity
// O(h) -> O(n) (if tree is badly unbalanced) space complexity
// where n = # nodes, h = max height of binary tree
// Time to complete: 15 min
// Patterns: DFS, Binary Tree, Top-Down Recursion
// Notes w.r.t. solution:

// A height-balanced binary tree is a binary tree in which the depth of the two
//.    subtrees of every node never differs by more than one.

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
 * @return {boolean}
 */
var isBalanced202304 = function (root) {
  if (!root) {
    return true;
  }

  return Math.abs(height202304(root.left) - height202304(root.right)) < 2
    && isBalanced202304(root.left) && isBalanced202304(root.right);
};

function height202304(node) {
  if (!node) {
    return -1;
  }

  return Math.max(height202304(node.left), height202304(node.right)) + 1;
}

const testCases = [
  {
    input: '',
    expected: ''
  },
];

testCases.forEach((testCase) => {
  // let result = FUT(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);