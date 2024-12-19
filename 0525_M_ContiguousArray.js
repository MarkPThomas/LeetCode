// 2024/12/18
// O(n) time complexity
// O(n) space complexity
// Time to complete: 12:03/15:57 min
// Patterns: Hashmap
// Notes w.r.t. solution: 2nd time was total time including for optimization beyond first solving @ 12:03
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  let count = 0;
  let maxLength = 0;

  const counts = {};
  counts[0] = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      count--;
    } else {
      count++;
    }

    if (count in counts) {
      const length = i - counts[count];
      maxLength = Math.max(maxLength, length);
    } else {
      counts[count] = i;
    }
  }

  return maxLength;
};