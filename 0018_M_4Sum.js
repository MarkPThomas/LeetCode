// 2025/06/07
// O(n^(k - 1)) -> O(n^3) time complexity
// O(k) -> O(n) space complexity
//  where k = 4 in this problem (k = # sum)
// Time to complete: OT/30:19 min
// Patterns: 2 Pointer
// Notes w.r.t. solution: Was on right track, snuck look at solution, implemented.
//  Had edge case of skipping recurring #s that threw minor things off that went OT/stopped timing.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {

  function twoSum(startInitial, target) {
    const pairs = [];

    let start = startInitial;
    let end = nums.length - 1;
    while (start < end) {
      const sum = nums[start] + nums[end];
      if (sum < target
        || (start > startInitial && nums[start] === nums[start - 1])) {

        start++;
      } else if (sum > target
        || nums[end] === nums[end + 1]) {

        end--;
      } else {
        pairs.push([nums[start], nums[end]]);

        start++;
        end--;
      }
    }

    return pairs;
  }

  function kSums(start, k, target) {
    if (start > nums.length - k
      || nums[start] > target / k             // Any remaining #s will be too large
      || nums[nums.length - 1] < target / k   // Any remaining #s will be too small
    ) {

      return [];
    } else if (k === 2) {
      return twoSum(start, target);
    }

    const results = [];
    for (let i = start; i <= nums.length - k; i++) {
      if (nums[i] === nums[i - 1] && i !== start) {
        continue;
      }

      const subsets = kSums(i + 1, k - 1, target - nums[i]);
      for (const subset of subsets) {
        subset.push(nums[i]);
        results.push(subset);
      }
    }
    return results;
  }

  nums.sort((a, b) => a - b);
  return kSums(0, 4, target);
};