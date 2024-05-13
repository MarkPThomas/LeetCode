// 2025/05/13
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:35 min
// Patterns: 2 Pointer
// Notes w.r.t. solution: Could solve simpler
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let negPtr = nums[nums.length - 1] < 0 ? nums.length - 1 : -1;

  if (negPtr === -1 && nums[0] < 0) {
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] < 0 && 0 <= nums[i + 1]) {
        negPtr = i;
        break;
      }
    }
  }

  let result = [];
  let posPtr = negPtr + 1;
  while (0 <= negPtr || posPtr < nums.length) {
    if ((0 <= negPtr && nums.length <= posPtr)
      || (0 <= negPtr && posPtr < nums.length
        && Math.abs(nums[negPtr]) < Math.abs(nums[posPtr]))) {
      result.push(nums[negPtr] ** 2);
      negPtr--;
    } else if (posPtr < nums.length) {
      result.push(nums[posPtr] ** 2);
      posPtr++;
    }
  }

  return result;
};


// 2025/05/13
// O(n) time complexity
// O(n) space complexity
// Time to complete: 10:48 min (including 2:32 for initial naiive solution)
// Patterns: Count Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let max = -Infinity;
  nums.forEach((num) => {
    max = Math.max(max, Math.abs(num));
  });

  const freqs = Array(max + 1).fill(0);
  nums.forEach((num) => {
    freqs[Math.abs(num)]++;
  });

  let ptr = 0;
  for (let i = 0; i < freqs.length; i++) {
    let count = freqs[i];
    while (count) {
      nums[ptr] = i ** 2;
      count--;
      ptr++;
    }
  }

  return nums;
};

// 2025/05/13
// O(n*log(n)) time complexity
// O(n) space complexity
// Time to complete: 2:32 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] ** 2;
  }

  return nums.sort((a, b) => a - b);
};
