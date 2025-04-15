// 2025/04/15
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 22:00 min
// Patterns: Binary Search
// Notes w.r.t. solution: Was unsure if sorting was allowed in the beginning. Being rushed left some subtle cases missed.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var twoSumLessThanK = function (nums, k) {
  nums.sort((a, b) => a - b);

  function getMaxNum(num, prev) {
    let left = prev + 1;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (nums[mid] < num) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return right === prev ? 0 : nums[right];
  }

  let maxSum = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (k <= nums[i]) {
      continue;
    }

    const numsJ = getMaxNum(k - nums[i], i);
    if (numsJ) {
      maxSum = Math.max(maxSum, nums[i] + numsJ);
    }
  }

  return maxSum ? maxSum : -1;
};