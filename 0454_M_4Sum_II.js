// 2024/11/03
// O(n^2) time complexity
// O(n^2) space complexity
// Time to complete: 19:11 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let numTuples = 0;
  const nums34Hash = {};
  for (let k = 0; k < nums3.length; k++) {
    for (let l = 0; l < nums3.length; l++) {
      if (!nums34Hash[nums3[k] + nums4[l]]) {
        nums34Hash[nums3[k] + nums4[l]] = 0;
      };
      nums34Hash[nums3[k] + nums4[l]]++;
    }
  }

  for (const num1 of nums1) {
    for (const num2 of nums2) {
      numTuples += nums34Hash[-(num1 + num2)] ?? 0;
    }
  }

  return numTuples;
};