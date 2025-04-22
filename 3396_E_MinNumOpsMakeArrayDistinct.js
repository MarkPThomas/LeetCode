// 2025/04/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: 21:00 min
// Patterns: Sliding Window
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  let numsRepeated = new Set();
  const numFreqs = {};
  for (const num of nums) {
    numFreqs[num] ??= 0;
    numFreqs[num]++;

    if (numFreqs[num] > 1) {
      numsRepeated.add(num);
    }
  }

  if (!numsRepeated.size) {
    return 0;
  }

  let opsCount = 0;
  for (let i = 0; i < nums.length; i += 3) {
    opsCount++;

    for (let j = i; j < Math.min(i + 3, nums.length); j++) {
      const num = nums[j];
      numFreqs[num]--;

      if (numFreqs[num] <= 1) {
        numsRepeated.delete(num);

        if (!numsRepeated.size) {
          return opsCount;
        }
      }

    }
  }

  return opsCount;
};