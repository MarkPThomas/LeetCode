// 2024/08/20
// O(n + m) time complexity
// O(n + m) space complexity
// Where n & m are lengths of nums 1& 2
// Time to complete: 14:44 min
// Patterns: Hash map
// Notes w.r.t. solution:
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  // freq count map of nums 1
  const nums1Freq = {};
  for (const num of nums1) {
    if (!nums1Freq[num]) {
      nums1Freq[num] = 0;
    }
    nums1Freq[num]++;
  }

  // freq count map of nums 2
  const nums2Freq = {};
  for (const num of nums2) {
    if (!nums2Freq[num]) {
      nums2Freq[num] = 0;
    }
    nums2Freq[num]++;
  }

  // update freq count map for min between the two
  const minFreqs = {};
  for (const key of Object.keys(nums1Freq)) {
    if (nums2Freq[key]) {
      const nums1Count = nums1Freq[key];
      const nums2Count = nums2Freq[key];
      const minCount = Math.min(nums1Count, nums2Count);

      if (minCount) {
        minFreqs[key] = minCount;
      }
    }
  }

  // export to array
  const result = [];
  for (let [key, value] of Object.entries(minFreqs)) {
    while (value) {
      result.push(key);
      value--;
    }
  }

  return result;
};