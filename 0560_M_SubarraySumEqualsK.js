// 2025/01/19
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: LeetCode worked solution
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const sumFreqs = {};
  sumFreqs[0] = 1;

  let count = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum - k in sumFreqs) {
      count += sumFreqs[sum - k];
    }

    sumFreqs[sum] = (sumFreqs[sum] ?? 0) + 1
  }

  return count;
};

// 2025/01/19
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 4:35 min TLE @ 88/93
// Patterns: Brute force
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {

    let sum = 0;
    for (j = i; j < nums.length; j++) {

      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }

  return count;
};