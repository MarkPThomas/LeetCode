// O(n) time complexity
// O(n) space complexity
// Time to complete: 5 min each
// Patterns: Binary Tree
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
var minDepth = function (root) {
  if (!root) {
    return 0;
  }

  // BFS
  let currentMinDepth = 1;
  const queue = [root, null];
  while (queue.length) {
    const node = queue.shift();
    if (node === null && queue.length) {
      currentMinDepth++;
      queue.push(null);
    } else {
      // first leaf found
      if (!node.left && !node.right) {
        break;
      }

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return currentMinDepth;

  // // DFS Preorder
  // if (root.left === null && root.right === null) {
  //   return 1;
  // }

  // let currentMinDepth = Infinity;
  // if (root.left) {
  //   currentMinDepth = Math.min(minDepth(root.left), currentMinDepth);
  // }
  // if (root.right) {
  //   currentMinDepth = Math.min(minDepth(root.right), currentMinDepth);
  // }

  // return currentMinDepth + 1;
};

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