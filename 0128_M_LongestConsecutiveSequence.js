// O(3 * n) -> O(n) time complexity
// O(2 * n) -> O(n) space complexity
// where n = nums.length
// Time to complete: 24:00 min
// Patterns: Graph DFS Traversal
// Notes w.r.t. solution:

// Refactored to be more brief: i.e. no need to attach & traverse nodes.
// Can loosely infer this from presence & increments of +/- 1
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // build adjacency list, marking adjacent to any existing number that is +/-1
  const numSet = {};
  for (let i = 0; i < nums.length; i++) {
    numSet[nums[i]] = null;
  }

  // traverse adjaceny list & count nodes
  let maxCount = 0;
  // get nodes that have no parents and traverse down children
  let numsUnique = Object.keys(numSet);
  for (let i = 0; i < numsUnique.length; i++) {
    let currentNum = parseInt(numsUnique[i]);
    if (!numSet.hasOwnProperty(currentNum - 1)) {
      // No children, smallest # in sequence
      let count = 1;
      while (numSet.hasOwnProperty(currentNum + 1)) {
        // Num has parent, continue traversing/incrementing to highest parent
        count++;
        currentNum++;
      }
      maxCount = Math.max(maxCount, count);
    }
  }

  return maxCount;
};

// // Original solution, fully-graph-oriented
// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var longestConsecutive = function (nums) {
//   // build adjacency list, marking adjacent to any existing number that is +/-1
//   const children = {};
//   const parents = {};
//   for (let i = 0; i < nums.length; i++) {
//     children[nums[i]] = null;
//     parents[nums[i]] = null;
//   }
//   for (let i = 0; i < nums.length; i++) {
//     if (children.hasOwnProperty(nums[i] + 1)) {
//       children[nums[i] + 1] = nums[i];
//     }
//     if (children.hasOwnProperty(nums[i] - 1)) {
//       children[nums[i]] = nums[i] - 1;
//     }
//     if (parents.hasOwnProperty(nums[i] + 1)) {
//       parents[nums[i]] = nums[i] + 1;
//     }
//     if (parents.hasOwnProperty(nums[i] - 1)) {
//       parents[nums[i] - 1] = nums[i];
//     }
//   }

//   // traverse adjaceny list & count nodes
//   let maxCount = 0;
//   // get nodes that have no parents and traverse down children
//   let parentNodes = Object.keys(parents);
//   for (let i = 0; i < parentNodes.length; i++) {
//     if (parents[parentNodes[i]] === null) {
//       // largest # in sequence
//       let count = 0;
//       let node = parentNodes[i];
//       while (node !== null) {
//         count++;
//         node = children[node];
//       }
//       maxCount = Math.max(maxCount, count);
//     }
//   }

//   return maxCount;
// };