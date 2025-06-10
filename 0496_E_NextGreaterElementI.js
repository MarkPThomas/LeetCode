// 2025/06/10
// O(m + n) -> O(n) time complexity
// O(n) space complexity
// where m = length nums1, n = length nums2
// Time to complete: 38:00 min
// Patterns: Monotonic Stack, Hashmap
// Notes w.r.t. solution: Missed seeing stack problem. Took a while to work out monotonic stack solution.
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  // ans[i] = [ j for nums1[i]===nums2[j], nextGreater2|-1 ]
  // nums1 is subset, non-contiguous, may be different order
  const nums2Idxs = {};
  for (let i = 0; i < nums2.length; i++) {
    nums2Idxs[nums2[i]] = i;
  }

  const nextGreaters = new Array(nums2.length);
  const greater = [];
  for (let i = nums2.length - 1; i >= 0; i--) {
    if (!greater.length || (i < nums2.length && nums2[i] < nums2[i + 1])) {
      greater.push(nums2[i + 1]);
    }

    while (greater.length && nums2[i] > greater[greater.length - 1]) {
      greater.pop();
    }

    nextGreaters[i] = (nums2[i] < greater[greater.length - 1]) ?
      greater[greater.length - 1] : -1;
  }

  const subNextGreaters = [];
  for (const num of nums1) {
    const nextIdx = nums2Idxs[num];
    const nextGreater = nextGreaters[nextIdx];
    subNextGreaters.push(nextGreater);
  }
  return subNextGreaters;
};