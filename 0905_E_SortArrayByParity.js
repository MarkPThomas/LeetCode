// 2024/05/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:08 min
// Patterns: 2 Pointers, Math, In-place
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  let evenPtr = 0;
  let oddPtr = nums.length - 1;

  while (evenPtr < oddPtr) {
    if (nums[evenPtr] % 2 === 0) {
      evenPtr++;
    }

    if (nums[oddPtr] % 2 !== 0) {
      oddPtr--;
    }

    if (evenPtr < oddPtr) {
      const temp = nums[evenPtr];
      nums[evenPtr] = nums[oddPtr];
      nums[oddPtr] = temp;
    }
  }

  return nums;
};

// 2024/05/15
// O(n) time complexity
// O(n) space complexity
// Time to complete: 3:38 min
// Patterns: 2 Pointers, Math
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  const result = Array(nums.length);

  let left = 0;
  let right = nums.length - 1;
  for (let i = 0; i < nums.length; i++) {
    if (left === right) {
      result[left] = nums[i];
      break;
    }

    if (nums[i] % 2) {
      result[right] = nums[i];
      right--;
    } else {
      result[left] = nums[i];
      left++;
    }
  }

  return result;
};