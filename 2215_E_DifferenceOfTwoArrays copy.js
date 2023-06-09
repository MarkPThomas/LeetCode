// O(n + m) time complexity
// O(max(n,m)) space complexity
// where n = size of nums1, m = size of nums2
// Time to complete: 6:00 min
// Patterns: Hashmap
// Notes w.r.t. solution:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  const distinct = {}
  for (let i = 0; i < nums1.length; i++) {
    distinct[nums1[i]] = true;
  }

  const distinct1 = { ...distinct };
  const distinct2 = {};
  for (let i = 0; i < nums2.length; i++) {
    if (distinct[nums2[i]]) {
      delete distinct1[nums2[i]];
    } else {
      distinct2[nums2[i]] = true;
    }
  }
  return [Object.keys(distinct1), Object.keys(distinct2)];
}