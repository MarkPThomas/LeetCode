// O(n) time complexity
// O(n) space complexity
// Time to complete: 18 min/10:20
// Patterns: BFS
// Notes w.r.t. solution: Solved in 10:20 but had shift/unshift error. Worked out by 18 min.
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
  if (!root.left && !root.right) {
    return true;
  } else if (!(root.left && root.right)) {
    return false;
  }

  const queueLeft = [root.left];
  const queueRight = [root.right];

  while (queueLeft.length && queueRight.length) {
    if (queueLeft.length !== queueRight.length) {
      return false;
    }

    const leftNode = queueLeft.shift();
    const rightNode = queueRight.shift();

    if (leftNode.val !== rightNode.val) {
      return false;
    }

    if (leftNode.left && rightNode.right) {
      queueLeft.push(leftNode.left);
      queueRight.push(rightNode.right);
    } else if (!(leftNode.left === null && rightNode.right === null)) {
      return false;
    }

    if (leftNode.right && rightNode.left) {
      queueLeft.push(leftNode.right);
      queueRight.push(rightNode.left);
    } else if (!(leftNode.right === null && rightNode.left === null)) {
      return false;
    }
  }

  return true;
};

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