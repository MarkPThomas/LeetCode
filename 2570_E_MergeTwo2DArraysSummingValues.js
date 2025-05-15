// 2025/05/15
// O(n1 + n2) time complexity
// O(n1 + n2) space complexity
//  where n1 = nums1 length, n2 = nums2 length
// Time to complete: 8:06 min
// Patterns: 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {number[][]} nums1
 * @param {number[][]} nums2
 * @return {number[][]}
 */
var mergeArrays = function (nums1, nums2) {
  // merge in order (maintaining order)
  // for redundant IDs, only use 1 id, but sum the values
  // sounds like 2 pointers, incrementing independently between each array

  const numsJoined = [];
  let p1 = 0;
  let p2 = 0;
  while (p1 < nums1.length && p2 < nums2.length) {
    const entry1 = nums1[p1];
    const entry2 = nums2[p2];

    if (entry1[0] < entry2[0]) {
      numsJoined.push(nums1[p1]);
      p1++;
    } else if (entry1[0] > entry2[0]) {
      numsJoined.push(nums2[p2]);
      p2++;
    } else {
      numsJoined.push([entry1[0], entry1[1] + entry2[1]]);
      p1++;
      p2++;
    }
  }

  // Append remainders
  while (p1 < nums1.length) {
    numsJoined.push(nums1[p1]);
    p1++;
  }

  while (p2 < nums2.length) {
    numsJoined.push(nums2[p2]);
    p2++;
  }

  return numsJoined;
};