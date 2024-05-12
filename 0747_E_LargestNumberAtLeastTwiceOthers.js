// 2024/05/12
// O(n) time complexity
// O(1) space complexity
// Time to complete: 6:24 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  let max = 0;
  let maxIndex = 0;
  let max2nd = 0;

  nums.forEach((num, idx) => {
    if (num > max) {
      max2nd = max;
      max = num;
      maxIndex = idx;
    } else if (num > max2nd) {
      max2nd = num;
    }
  });

  return max >= 2 * max2nd ? maxIndex : -1;
};