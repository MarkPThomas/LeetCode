// O(n) time complexity
// O(1) space complexity
// Time to complete: 27 min + 3 min (for optimization)
// Patterns: Array/string.
// Notes w.r.t. solution: Took a 'hail mary' hint about 15 min in, but worked out the solution from there pretty fast.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const productLeft = [1];
  for (let i = 1; i < nums.length; i++) {
    productLeft.push(productLeft[i - 1] * nums[i - 1]);
  }

  let rightProduct = 1;
  for (let i = productLeft.length - 2; 0 <= i; i--) {
    rightProduct *= nums[i + 1];
    productLeft[i] *= rightProduct;
  }
  return productLeft;
};