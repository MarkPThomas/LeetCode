// 2024/05/07
// O(n) time complexity
// O(1) space complexity
// Time to complete: 16:42 min
// Patterns: 2 Pointer, Sliding Window
// Notes w.r.t. solution: Solved in 4:03 but with some dumb mistakes. Lost time in console logs. Instead of this, slow down, diagram, be sure of logic!

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let maxConsecutive = 0;
  let ptrI = 0;
  let ptrJ = -1;

  nums.forEach((num, i) => {
    if (num === 1) {
      if (nums[i - 1] !== 1) {
        ptrI = i;
      }
      ptrJ = i;
    } else {
      maxConsecutive = Math.max(maxConsecutive, ptrJ - ptrI + 1);
    }
  });

  maxConsecutive = Math.max(maxConsecutive, ptrJ - ptrI + 1);

  return maxConsecutive;
};