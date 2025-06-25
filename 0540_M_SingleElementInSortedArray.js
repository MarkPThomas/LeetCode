// 2025/06/25
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 18:54 min
// Patterns: Binary Search
// Notes w.r.t. solution: Watch those edge cases! Cost time addressing them after coding.
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let low = 0;
  let high = nums.length - 1;

  // Check ends
  if (nums[low] !== nums[low + 1]) {
    return nums[low];
  } else if (nums[high] !== nums[high - 1]) {
    return nums[high]
  }

  while (high - low > 1) {
    const mid = low + Math.floor((high - low) / 2);
    const firstIdx = nums[mid] === nums[mid - 1] ? mid - 1 : mid;
    if (firstIdx % 2) { // first occurrence of val is @ odd idx
      high = mid; // look left
    } else {
      low = mid; // look right
    }
  }

  const numLow = nums[low];
  const numMid = nums[low + 1];
  const numHigh = nums[high];

  return numLow === numMid ? numHigh : numLow;
};