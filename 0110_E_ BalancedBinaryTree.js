// O(n * log(n)) time complexity
// O(h) -> O(n) (if tree is badly unbalanced) space complexity
// where n = # nodes, h = max height of binary tree
// Time to complete: 15 min
// Patterns: DFS, Binary Tree
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
var isBalanced = function (root) {
  if (!root) {
    return true;
  }

  return Math.abs(height(root.left) - height(root.right)) < 2
    && isBalanced(root.left) && isBalanced(root.right);
};

function height(node) {
  if (!node) {
    return -1;
  }

  return Math.max(height(node.left), height(node.right)) + 1;
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