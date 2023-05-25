// O(n) time complexity
// O(n) space complexity
// Time to complete: 27 min
// Patterns: Array/string.
// Notes w.r.t. solution: Took a 'hail mary' hint about 15 min in, but worked out the solution from there pretty fast.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const productLeft = [1];
  const productRight = [1];
  for (let i = 1; i < nums.length; i++) {
    productLeft.push(productLeft[i - 1] * nums[i - 1]);
    productRight.push(productRight[i - 1] * nums[nums.length - i]);
  }

  const answer = [];
  for (let i = 0; i < productLeft.length; i++) {
    answer.push(productLeft[i] * productRight[productRight.length - 1 - i]);
  }
  return answer;
};