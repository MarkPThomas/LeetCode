// O(n) time complexity
// O(n) space complexity
// Time to complete: 40 min
// Patterns: BFS
// Notes w.r.t. solution: Lost a lot of time being a bit too fast, was keeping track of row changes unnnecessarily.

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
  const queue = [root, root];

  while (queue.length) {
    const nodeLeft = queue.shift();
    const nodeRight = queue.shift();

    if (nodeLeft === null && nodeRight === null) {
      continue;
    } else if (nodeLeft === null || nodeRight === null || nodeLeft.val !== nodeRight.val) {
      return false;
    }

    queue.push(nodeLeft.left);
    queue.push(nodeRight.right);
    queue.push(nodeLeft.right);
    queue.push(nodeRight.left);
  }

  return true;
};

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