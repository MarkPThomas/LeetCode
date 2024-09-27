// O(2 * n) -> O(n) time complexity
// O(2 * n) -> O(n) space complexity
// where n = nums.length
// Time to complete: 14:55 min
// Patterns: Hashmap
// Notes w.r.t. solution: Spent 21:01 on array strategy that ended up in TLE.
//  Spent 7:13 on hashmap strategy that ended in TLE, peeked at past solution roughly for hint
//  After hint, optimized solution over another 7:42
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (!nums.length) {
    return 0;
  }

  const numsMap = {}
  nums.forEach((num) => {
    numsMap[num] = true;
  });

  // To avoid counting repeating #s, just traverse map keys
  const numsUnique = Object.keys(numsMap);

  // To avoid an extra map or extra work, we can just find the lowest # in a sequence
  // Lowest # is where there is no i - 1
  // Sequence counts so long as there is i + 1
  let longestSequence = 0;
  for (let i = 0; i < numsUnique.length; i++) {
    const num = parseInt(numsUnique[i]);
    if (!numsMap[num - 1]) {
      // Lowest # in sequence
      let sequence = 1;

      // Count how many higher adjacent #s are in list
      while (numsMap[num + sequence]) {
        sequence++;
      }

      longestSequence = Math.max(longestSequence, sequence);
    }
  }

  return longestSequence;
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