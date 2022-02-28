// O(nLog(n)) time complexity
// O(n) space complexity
// Time to complete: 10:25 min.
// Patterns:
// Notes w.r.t. solution: Initially faster but wrong in not considering negative numbers, then not realizing sort() is done alphabetically in JS unless a sorting function if provided.

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maximumProductWithSort = function(nums) {
  nums.sort((a, b) => a - b);
  let maximumPositive = 1;
  for (let i = nums.length - 1; i >= nums.length - 3; i--) {
      maximumPositive *= nums[i];
  }

  // if negative #s, 2 negatives & 1 positive may govern
  // in this case, 2 smallest negatives * largest positive;
  let maximumNegative = 1;
  for (let i = 0; i < 2; i++) {
      maximumNegative *= nums[i];
  }
  maximumNegative *= nums[nums.length - 1];

  return Math.max(maximumPositive, maximumNegative);
};

// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:54 min - Finished at 5:30 but had to debug some minor errors. Check more closely!.
// Patterns:

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maximumProduct = function(nums) {
  // occurs multiplying 3 largest #s, or 2 smallest & 1 largest
  let max1st = Number.NEGATIVE_INFINITY;
  let max2nd = Number.NEGATIVE_INFINITY;
  let max3rd = Number.NEGATIVE_INFINITY;

  let min1st = Number.POSITIVE_INFINITY;
  let min2nd = Number.POSITIVE_INFINITY;

  for (let i = 0; i < nums.length; i++) {
      let value = nums[i];
      if (value > max1st) {
          max3rd = max2nd;
          max2nd = max1st;
          max1st = value;
      } else if (value > max2nd) {
          max3rd = max2nd;
          max2nd = value;
      } else if (value > max3rd) {
          max3rd = value;
      }

      if (value < min1st) {
          min2nd = min1st;
          min1st = value;
      } else if (value < min2nd) {
          min2nd = value;
      }
  }

  return Math.max(
    max1st * max2nd * max3rd,
    min1st * min2nd * max1st);
};