// 2024/04/20
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:23 min
// Patterns: Binary Tree, DFS Preorder, Iterative
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const stack = [[root, []]];
  const paths = [];

  while (stack.length) {
    const [node, path] = stack.pop();
    path.push(node.val);

    if (!node.left && !node.right) {
      paths.push(path);
    } else {
      if (node.left) {
        stack.push([node.left, [...path]]);
      }

      if (node.right) {
        stack.push([node.right, [...path]]);
      }
    }
  }

  const joinedPaths = [];
  paths.forEach((path) => {
    joinedPaths.push(path.join('->'));
  });

  return joinedPaths;
}


// 2023/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 12 min
// Patterns: Depth-First Search
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
 * @return {string[]}
 */
var binaryTreePaths2023 = function (root) {
  const rootToLeafPaths = leafPaths2023(root);
  const pathsOutputs = [];
  rootToLeafPaths.forEach((rootToLeafPath) => {
    const pathOutput = rootToLeafPath.join('->');
    pathsOutputs.push(pathOutput);
  })
  return pathsOutputs;
};

// DFS Postorder
function leafPaths2023(node) {
  const totalPath = [];
  const initialPath = [node.val];

  if (node.left) {
    addChildLeafPaths(node.left, initialPath, totalPath);
  }

  if (node.right) {
    addChildLeafPaths(node.right, initialPath, totalPath);
  }

  if (node.left === null && node.right === null) {
    totalPath.push(initialPath);
  }

  return totalPath;
}

function addChildLeafPaths(node, initialPath, totalPath) {
  const leafPaths = leafPaths2023(node);
  leafPaths.forEach((leafPath) => {
    totalPath.push(initialPath.concat(leafPath));
  })
}

const testCases = [
  {
    input: [1, 2, 3, null, 5],
    expected: ["1->2->5", "1->3"]
  },
  {
    input: [1],
    expected: ["1"]
  },
];

// =======
testCases.forEach((testCase) => {
  let result = binaryTreePaths(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);