// O(n * log(n) + m * log(m)) time complexity for sorting
//  O(n * log(m)) time complexity for searching
// O(m) space complexity for sorting,
//  O(1) space complexity for searching
// where m = Max(nums1, nums2) & n = Min(nums1, nums2)
// Time to complete: 11:32 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  }

  const sorted1 = nums1.sort((a, b) => a - b);
  const sorted2 = nums2.sort((a, b) => a - b);

  // going through shorter array
  const sortedShort = sorted1.length < sorted2.length ? sorted1 : sorted2;
  const sortedLong = sorted1.length < sorted2.length ? sorted2 : sorted1;

  const intersection = [];
  //  increment to next unique #
  let lastNum = null;
  for (let i = 0; i < sortedShort.length; i++) {
    if (sortedShort[i] === lastNum) {
      continue;
    }
    lastNum = sortedShort[i];

    //  use binary search to find where/if number exists in longer array
    const matchIdx = binarySearch(sortedLong, sortedShort[i]);
    if (matchIdx === -1) {
      continue;
    }

    intersection.push(sortedShort[i]);
  }

  return intersection;
};

// O(n + m) time complexity
// O(n + m) space complexity
// where m = Max(nums1, nums2) & n = Min(nums1, nums2)
// Time to complete: 8:45 min
// Patterns: Hashmap
// Notes w.r.t. solution: Solution below is simplified/refactored from initially successful solution.
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const minNums = nums1.length < nums2.length ? nums1 : nums2;
  const maxNums = nums1.length < nums2.length ? nums2 : nums1;

  const uniqueNums = {};
  maxNums.forEach((num) => {
    if (!uniqueNums[num]) {
      uniqueNums[num] = true;
    }
  });

  const intersection = [];
  minNums.forEach((num) => {
    if (uniqueNums[num]) {
      intersection.push(num);
      delete uniqueNums[num];
    }
  });

  return intersection;
};

// Initial solution before refactoring to be simpler, loop less
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const nums1U = {};
  nums1.forEach((num) => {
    if (!nums1U[num]) {
      nums1U[num] = true;
    }
  });

  const nums2U = {};
  nums2.forEach((num) => {
    if (!nums2U[num]) {
      nums2U[num] = true;
    }
  });

  const nums1UKeys = Object.keys(nums1U);
  const nums2UKeys = Object.keys(nums2U);

  let minKeys = nums1UKeys.length < nums2UKeys.length ? nums1UKeys : nums2UKeys;
  let maxU = nums1UKeys.length < nums2UKeys.length ? nums2U : nums1U;

  const result = [];
  for (let i = 0; i < minKeys.length; i++) {
    if (maxU[minKeys[i]]) {
      result.push(minKeys[i]);
    }
  }

  return result;
};