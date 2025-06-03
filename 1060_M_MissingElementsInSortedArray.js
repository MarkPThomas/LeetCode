// 2025/06/03
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 22:20 min
// Patterns: Binary Searcg
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingElement = function (nums, k) {
  // We can determine the # of missing #s in an array as
  //  #missing = maxVal - 1stVal - (length - 1)
  //  maxval = lastVal in range since #s are ordered
  //  kMissing = lastVal - 1stVal - (length - 1)

  // This can apply for any contiguous segment of the array
  //  As well as determining if k lies outside the array

  // k of array < k ? outside bounds
  // k of array >= k ? inside bounds -> contract
  // variable is range.
  // Since k counts from left, no need to change start of range
  // => variable is end of range

  function getNumMissing(lastIdx) {
    return nums[lastIdx] - nums[0] - lastIdx;
  }

  let lastIdx = nums.length - 1;
  let kMissing = getNumMissing(lastIdx);
  if (k > kMissing) {
    return nums[lastIdx] + (k - kMissing);
  }

  // Binary search of array, starting @ middle index
  // looking closer to 0 has fewer missing
  // looking closer to last has more missing
  // we want position where num left < k < num right
  let min = 0;
  let max = lastIdx;
  while (min <= max) {
    const mid = min + Math.floor((max - min) / 2);
    kMissing = getNumMissing(mid);

    if (kMissing < k) { // look right
      min = mid + 1;
    } else { // look left
      max = mid - 1;
    }
  }

  // max < min by 1
  // k@max < k < k@min
  return nums[max] + (k - getNumMissing(max));
};