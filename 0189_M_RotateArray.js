// 2024/05/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: 15:52 min
// Patterns: Math
// Notes w.r.t. solution: 10:10 min to solve with non-working cyclic sorting.
//    Another 5:42 min to modifify to just use auxiliary array.
//    Would have been under 10 min if I had just done this first.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  // update k for when k > length;
  k = k % nums.length;

  const result = [...nums];
  for (let i = 0; i < result.length; i++) {
    let targetIdx = i + k;
    if (targetIdx < result.length) {
      nums[targetIdx] = result[i];
    } else {
      nums[targetIdx - result.length] = result[i];
    }
  }
};


// 2023/04
// O(n) time complexity
// O(1) space complexity
// Time to complete: too long :-( min
// Patterns: Cyclic sorting
// Notes w.r.t. solution: Would have been saved if I had diagrammed things out more before coding

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  if (nums.length < 2) {
    return;
  }

  let count = 0;
  for (let startIndex = 0; count < nums.length; startIndex++) {
    let currentIndex = startIndex;
    let lastValue = nums[startIndex];
    do {
      let nextIndex = (currentIndex + k) % nums.length;
      let tempValue = nums[nextIndex];
      nums[nextIndex] = lastValue;
      lastValue = tempValue;
      currentIndex = nextIndex;
      count++;

    } while (startIndex !== currentIndex)
  }
};