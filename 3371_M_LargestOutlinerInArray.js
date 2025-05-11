// 2025/05/11
// O(n) time complexity
// O(n) space complexity
// Time to complete: 30:08 min
// Patterns: Prefix Sum, Hashmap
// Notes w.r.t. solution: 18:47 - 840/873 first attempt. After hint, solved.
/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  let totalSum = 0;
  for (const num of nums) {
    totalSum += num;
  }

  // if outlier removed, array sum = 2 * specialSum
  const doubleSums = {};
  for (let i = 0; i < nums.length; i++) {
    const doubleSum = totalSum - nums[i];
    doubleSums[doubleSum] ??= [];
    doubleSums[doubleSum].push(i);
  }

  // for each #, if 2*# in doubleSums & num idx is not part of double sum, is special sum
  let maxOutlier = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    const specialSum = nums[i];
    const specialSumDouble = 2 * specialSum;
    if (specialSumDouble in doubleSums) {
      const outlierIdxs = doubleSums[specialSumDouble];
      for (const outlierIdx of outlierIdxs) {
        if (outlierIdx !== i) {
          maxOutlier = Math.max(maxOutlier, nums[outlierIdx]);
        }
      }
    }
  }

  return maxOutlier;
};