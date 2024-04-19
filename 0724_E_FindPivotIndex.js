// 2024/04/19
// O(n) time complexity
// O(1) space complexity
// Time to complete: 6:38 min
// Patterns: Prefix Sum
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  // get array sum
  let sum = 0;
  nums.forEach((num) => {
    sum += num;
  })

  // slide window, substracting/adding across the pivot
  let sumL = 0;
  let sumR = sum;
  for (let i = 0; i < nums.length; i++) {
    if (0 < i) {
      sumL += nums[i - 1];
    }
    sumR -= nums[i];

    if (sumL === sumR) {
      return i;
    }
  }

  return -1;
};


// 2023/05
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