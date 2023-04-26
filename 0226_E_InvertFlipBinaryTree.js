// O(n) time complexity
// O(n) space complexity
// Time to complete: 3 min
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) {
    return root;
  }

  // BFS
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();

    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  // // DFS Preorder
  // const temp = root.left;
  // root.left = root.right;
  // root.right = temp;

  // invertTree(root.left);
  // invertTree(root.right);

  return root;
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