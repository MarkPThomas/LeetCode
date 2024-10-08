// 2024/10/07
// O(n) time complexity
// O(n) space complexity
// Time to complete: 27:06 min
// Patterns: Array/string, prefix
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const prefixes = [];
  for (let i = 0; i < nums.length; i++) {
    const prefix = i > 0 ? prefixes[i - 1] : 1;
    prefixes[i] = nums[i] * prefix;
  }

  const suffixes = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    const suffix = i < nums.length - 1 ? suffixes[i + 1] : 1;
    suffixes[i] = nums[i] * suffix;
  }

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const prefix = i > 0 ? prefixes[i - 1] : 1;
    const suffix = i < nums.length - 1 ? suffixes[i + 1] : 1;
    result.push(prefix * suffix);
  }

  return result;
};

// 2023/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: 27 min + 3 min (for optimization)
// Patterns: Array/string, prefix
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