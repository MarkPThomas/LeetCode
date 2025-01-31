// 2025/01/31
// O(log(min(n, m))) time complexity
// O(1) space complexity
//  where n = length of nums1, m = length of nums2
// Time to complete: xx min
// Patterns: Binary Search
// Notes w.r.t. solution: Worked solution
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {

  function getBoundedVals(mid, nums) {
    const maxLeft = (0 < mid) ? nums[mid - 1] : -Infinity;
    const minRight = (mid < nums.length) ? nums[mid] : Infinity;

    return [maxLeft, minRight];
  }

  const short = nums1.length < nums2.length ? nums1 : nums2;
  const long = nums1.length < nums2.length ? nums2 : nums1;

  let shortLeft = 0;
  let shortRight = short.length;

  while (shortLeft <= shortRight) {
    const shortMid = shortLeft + Math.floor((shortRight - shortLeft) / 2);
    const [shortMaxLeft, shortMinRight] = getBoundedVals(shortMid, short);

    const longMid = Math.floor((long.length + short.length + 1) / 2 - shortMid);
    // const longMid = short.length + Math.floor((long.length - short.length + 1) / 2) - shortMid;
    const [longMaxLeft, longMinRight] = getBoundedVals(longMid, long);

    if (shortMaxLeft <= longMinRight && longMaxLeft <= shortMinRight) {
      const medianLeft = Math.max(shortMaxLeft, longMaxLeft);
      if ((short.length + long.length) % 2) { // Odd - only need element from left halfs
        return medianLeft;
      } else {    // Even - include element from right halfs
        const medianRight = Math.min(shortMinRight, longMinRight);
        return (medianLeft + medianRight) / 2;
      }
    } else if (shortMaxLeft > longMinRight) {
      shortRight = shortMid - 1;
    } else {
      shortLeft = shortMid + 1;
    }
  }

  return 0;
};

// 2025/01/31
// O() time complexity
// O() space complexity
// Time to complete: OT min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  function getClosestMin(target, nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);

      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }

    return left;
  }

  const short = nums1.length < nums2.length ? nums1 : nums2;
  const long = nums1.length < nums2.length ? nums2 : nums1;

  // Get median of longer array
  let ls = Math.ceil(long.length / 2) - 1;
  // let longMed = long.length % 2 ? (long[longMed] + long[longMed + 1] / 2) : long[longMed];

  // Find closest <= val in shorter array
  // let ss = getClosestMin(longMed, short);
  let ss = getClosestMin(long[ls], short);

  while (ss < short.length && ls >= 0) {
    if (short[ss] <= long[ls] && long[ls] < short[ss + 1]) { // Anchor in Long
      if ((short.length + long.length) % 2) { // Total odd
        return long[ls];
      } else {    // Total even
        return Math.floor((long[ls] + Math.min(short[ss + 1], long[sl + 1])) / 2)
      }
    } else if (long[ls] <= short[ss] && short[ss] < long[ls + 1]) { // Anchor in Short
      if ((short.length + long.length) % 2) { // Total odd
        return short[ss];
      } else {    // Total even
        return Math.floor((short[ss] + Math.min(short[ss + 1], long[sl + 1])) / 2)
      }
    }

    if (short[ss] < long[ls]) {
      ss++;
      ls = getClosestMin(short[ss], long);
    } else {
      ls--;
      ss = getClosestMin(long[ls], short);
    }
  }
};