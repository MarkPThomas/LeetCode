// O(n * log (n)) time complexity
// O(1) space complexity
// Time to complete: 23 min brute force, 10 min 2 pointer// Patterns: 2 Pointer
// Notes w.r.t. solution: Can do O(n) time & space complexities with 1- or 2-passes with hashmap.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  nums.sort((a, b) => a - b);
  let rightPtr = nums.length - 1;
  while (0 < rightPtr && k <= nums[rightPtr]) {
    rightPtr--;
  }
  if (rightPtr === 0) {
    return 0;
  }

  let numOperations = 0;
  let leftPtr = 0;
  while (leftPtr < rightPtr) {
    const numSmall = nums[leftPtr];
    const numLarge = nums[rightPtr];
    if (numSmall + numLarge === k) {
      numOperations++;
      leftPtr++;
      rightPtr--;
    } else if (numSmall + numLarge > k) {
      rightPtr--;
    } else {
      leftPtr++;
    }
  }
  return numOperations;
};



// // Brute force
// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var maxOperations = function (nums, k) {
//   const visitedNums = {};
//   let numOperations = 0;
//   let basePtr = 0;
//   while (basePtr < nums.length - 1) {
//     const num1 = nums[basePtr];
//     let nextPtr = basePtr + 1;
//     if (num1 < k && !visitedNums[basePtr]) {
//       while (nextPtr < nums.length) {
//         if (!visitedNums[nextPtr]) {
//           const num2 = nums[nextPtr];
//           if (!visitedNums[nextPtr] && num1 + num2 === k) {
//             numOperations++;
//             visitedNums[nextPtr] = true;
//             break;
//           }
//         }
//         nextPtr++;
//       }
//     }
//     visitedNums[basePtr] = true;
//     basePtr++;
//   }
//   return numOperations;
// };