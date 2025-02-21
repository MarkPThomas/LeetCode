// 2025/02/21
// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: Kadane's Algorithm
// Notes w.r.t. solution: Worked solution
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max = -Infinity;
  let currMax = 1;
  let currMin = 1;
  for (const num of nums) {
    const tempMax = Math.max(num, currMax * num, currMin * num);
    currMin = Math.min(num, currMax * num, currMin * num);
    currMax = tempMax;

    max = Math.max(max, currMax);
  }

  return max;
};

// 2025/02/21
// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:55 min
// Patterns: Kadane's Algorithm
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max = -Infinity;
  let currMaxNeg = null;
  let currMaxNegRev = null;
  let currMaxPos = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const numRev = nums[nums.length - 1 - i];

    // Assign if reset, else multiply
    currMaxNeg = currMaxNeg ? currMaxNeg * num : num;
    currMaxNegRev = currMaxNegRev ? currMaxNegRev * numRev : numRev;
    if (num > 0) {
      currMaxPos = currMaxPos ? currMaxPos * num : num;
    } else {
      currMaxPos = 0;
    }

    max = Math.max(max, currMaxNeg, currMaxNegRev);
    if (currMaxPos) {
      max = Math.max(max, currMaxPos);
    }
  }

  return max;
};