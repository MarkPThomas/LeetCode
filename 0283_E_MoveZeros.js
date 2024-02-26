// 2023/5
// O(n) time complexity
// O(1) space complexity
// Time to complete: 4 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let firstZeros = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0 && firstZeros === -1) {
      firstZeros = i;
    } else if (nums[i] !== 0 && firstZeros !== -1) {
      nums[firstZeros] = nums[i];
      nums[i] = 0;
      firstZeros++;
    }
  }
};

// 2024/2/26
// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:25 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes202402 = function (nums) {
  let lastNonzero = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNonzero] = nums[i];
      lastNonzero++;
    }
  }

  while (lastNonzero < nums.length) {
    nums[lastNonzero] = 0;
    lastNonzero++;
  }
};