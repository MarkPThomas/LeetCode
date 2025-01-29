// 2025/01/29
// O(n) time complexity
// O(min(n, k)) space complexity
//  where n = # of numbers, k = index diff (window width)
// Time to complete: NA min
// Patterns: Hashmap, Bucket Sort
// Notes w.r.t. solution: Worked solution
/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
  const buckets = {};
  const w = valueDiff + 1;

  function getId(x, w) {
    return Math.floor(x / w);
  }

  for (let i = 0; i < nums.length; i++) {
    const bucket = getId(nums[i], w);
    if (bucket in buckets
      || ((bucket + 1) in buckets
        && Math.abs(nums[i] - buckets[bucket + 1]) < w)
      || ((bucket - 1) in buckets
        && Math.abs(nums[i] - buckets[bucket - 1]) < w)) {
      return true;
    }

    buckets[bucket] = nums[i];
    if (i >= indexDiff) {
      const leavingBucket = getId(nums[i - indexDiff], w);
      delete buckets[leavingBucket];
    }
  }

  return false;
};