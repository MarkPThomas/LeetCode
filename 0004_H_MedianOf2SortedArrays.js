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

    const longMid = short.length + Math.floor((long.length - short.length + 1) / 2) - shortMid;
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
// O(log(m * n)) time complexity
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

  function getElementAt(k) {
    let start1 = 0;
    let end1 = nums1.length - 1;

    let start2 = 0;
    let end2 = nums2.length - 1;

    while (start1 <= end1 && start2 <= end2) {
      const mid1 = start1 + Math.floor((end1 - start1) / 2);
      const val1 = nums1[mid1];

      const mid2 = start2 + Math.floor((end2 - start2) / 2);
      const val2 = nums2[mid2];

      if (mid1 + mid2 < k) {  // Answer cannot be in one of the first halfs
        if (val1 > val2) {  // Answer cannot be in first half of nums2
          start2 = mid2 + 1;  // Remove first half of nums2
        } else {
          start1 = mid1 + 1;  // Remove first half of nums1
        }
      } else {
        if (val1 > val2) {  // Answer cannot be in last half of nums1
          end1 = mid1 - 1;  // Remove last half of nums1
        } else {
          end2 = mid2 - 1;  // Remove last half of nums 2
        }
      }
    }

    return end1 < start1 ? nums2[k - start1] : nums1[k - start2];
  }

  const totalLength = nums1.length + nums2.length;
  const k = Math.floor(totalLength / 2);

  const kVal = getElementAt(k);
  if (totalLength % 2) {
    return kVal;
  } else {
    const lVal = getElementAt(k - 1);
    return (lVal + kVal) / 2;
  }
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