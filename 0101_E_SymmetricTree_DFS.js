// O(n) time complexity
// O(n) space complexity
// Time to complete: 5 min
// Patterns: DFS
// Notes w.r.t. solution: Easier conceptually than BFS

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
var isSymmetric = function (root) {
  return isMirror(root, root);
};

function isMirror(nodeLeftSide, nodeRightSide) {
  if (nodeLeftSide === null && nodeRightSide === null) {
    return true;
  }
  if (nodeLeftSide === null || nodeRightSide === null) {
    return false;
  }

  return nodeLeftSide.val === nodeRightSide.val
    && isMirror(nodeLeftSide.left, nodeRightSide.right)
    && isMirror(nodeLeftSide.right, nodeRightSide.left);
}

const testCases = [
  {
    input: [1, 2, 2, 3, 4, 4, 3],
    expected: true
  },
  {
    input: [1, 2, 2, null, 3, null, 3],
    expected: false
  },
];

testCases.forEach((testCase) => {
  let result = isSymmetric(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);