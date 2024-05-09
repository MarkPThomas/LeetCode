// 2024/05/09
// O(n * log(n)) time complexity - for sorting
// O(n) space complexity - for sorting
// Time to complete: 12:50 min
// Patterns: Greedy
// Notes w.r.t. solution: Since sorting limits the time-space complexity, this could be optimized by
//    using Count Sort and travesing it in a similar way - most optimal is to not modify the array, but alternate
//    local min/max values

/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  let maxSumOfMins = 0;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 1; i += 2) {
    maxSumOfMins += Math.min(nums[i], nums[i + 1]);
  }

  return maxSumOfMins;
};