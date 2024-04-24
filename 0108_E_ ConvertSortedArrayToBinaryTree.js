// 2024/04/24
// O(n) time complexity
// O(log(n)) space complexity
// Time to complete: 14:23 min
// Patterns: Binary Search, Binary Tree, DFS Preorder
// Notes w.r.t. solution: Note that to build a balanced tree, we merely need to do a binary traversal of all nodes
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function addBalancedNodes(iMin, iMax) {
    if (iMax < iMin) {
      return null;
    }

    let iMedian = Math.floor(iMin + (iMax - iMin) / 2);

    const node = { val: nums[iMedian], left: null, right: null }

    node.left = addBalancedNodes(iMin, iMedian - 1);
    node.right = addBalancedNodes(iMedian + 1, iMax);

    return node;
  }

  return addBalancedNodes(0, nums.length - 1);
};



// 2023/04
// O(n) time complexity
// O(log(n)) space complexity
// Time to complete: Too long :-(
// Patterns: Binary Search, Binary Tree
// Notes w.r.t. solution: Again, jumped in too fast, wasted time pursuing the wrong solutions.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function addBalancedNode(minIndex, maxIndex) {
    if (minIndex > maxIndex) {
      return null;
    }
    const midIndex = Math.ceil((minIndex + maxIndex) / 2);

    // PreOrder DFS
    const root = new TreeNode(nums[midIndex]);
    root.left = addBalancedNode(minIndex, midIndex - 1);
    root.right = addBalancedNode(midIndex + 1, maxIndex);

    return root;
  }

  return addBalancedNode(0, nums.length - 1);
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