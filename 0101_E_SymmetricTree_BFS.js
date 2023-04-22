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
  if (root.left === null && root.right === null) {
    return true;
  }
  if (root.left === null || root.right === null || root.left.val !== root.right.val) {
    return false;
  }

  const queueLeft = [root.left];
  const queueRight = [root.right];

  while (queueLeft.length && queueRight.length) {
    const nodeLeft = queueLeft.shift();
    const nodeRight = queueRight.shift();
    if (nodeLeft.val !== nodeRight.val) {
      return false;
    }

    if (nodeLeft.left && nodeRight.right) {
      queueLeft.push(nodeLeft.left);
      queueRight.push(nodeRight.right);
    } else if (!(nodeLeft.left === null && nodeRight.right === null)) {
      return false;
    }

    if (nodeLeft.right && nodeRight.left) {
      queueLeft.push(nodeLeft.right);
      queueRight.push(nodeRight.left);
    } else if (!(nodeLeft.right === null && nodeRight.left === null)) {
      return false;
    }
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