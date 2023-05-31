// O(n) time complexity
// O(1) space complexity
// Time to complete: 6 min
// Patterns: Prefix Sum
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let numSumRight = 0;
  nums.forEach((num) => {
    numSumRight += num;
  });

  let numSumLeft = 0;
  for (let i = 0; i < nums.length; i++) {
    numSumRight -= nums[i];
    if (numSumLeft === numSumRight) {
      return i;
    }
    numSumLeft += nums[i];
  }

  return -1;
};