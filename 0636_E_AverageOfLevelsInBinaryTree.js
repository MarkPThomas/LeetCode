// O(n) time complexity
// O(n) space complexity
// Time to complete: 18 min
// Patterns: BFS
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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  let children = [root];
  let nextChildren = [];
  const averageValues = [root.val];
  let childValues = [];

  while (children.length || nextChildren.length) {
    if (!children.length) {
      if (childValues.length) {
        const total = childValues.reduce((acc, val) => acc + val, 0);
        averageValues.push(total / childValues.length);
        childValues = [];
      }
      children = nextChildren;
      nextChildren = [];
    } else {
      const node = children.shift();
      if (node.left) {
        childValues.push(node.left.val);
        nextChildren.push(node.left);
      }
      if (node.right) {
        childValues.push(node.right.val);
        nextChildren.push(node.right);
      }
    }
  }

  return averageValues;
};

const testCases = [
  {
    input: [3, 1, 5, 0, 2, 4, 6],
    expected: [3, 3, 3]
  },
];

testCases.forEach((testCase) => {
  let result = averageOfLevels(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);