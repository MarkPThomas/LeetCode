// 2025/06/01
// O(n) time complexity
// O(n) space complexity
// Time to complete: 18:48 min - 90/101 then OT
// Patterns: Prefix Sum
// Notes w.r.t. solution: Hashmap optimization
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  // count subarray sum n * k that has more than 2 elements

  const sumFreq = {};
  sumFreq[0] = true;

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (nums[i] === 0 && nums[i + 1] === 0) {
      return true;
    }

    if (sum && (sum - k) % k in sumFreq) {
      if ((sum - k) % k === 0 && nums[i] !== sum && (sum - k) in sumFreq) {
        return true;
      }
    }

    sumFreq[sum] = true; // i
  }

  return false;
};

// 2025/06/01
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 3:48 min - TLE @ 94/101
// Patterns: Prefix Sum
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  // count subarray sum n * k that has more than 2 elements
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum % k === 0 && j > i) {
        return true;
      }
    }
  }

  return false;
};

// ==== Solution ====
// O(n) time complexity
// O(n) space complexity
// Patterns: Prefix Sum
// Notes w.r.t. solution: Hashmap optimization
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  // count subarray sum n * k that has more than 2 elements

  const modSeen = {};
  modSeen[0] = -1;

  let prefixMod = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixMod = (prefixMod + nums[i]) % k;

    if (prefixMod in modSeen) { // has sum multiple of k
      if (i - modSeen[prefixMod] > 1) { // size > 1
        return true;
      }
    } else {
      modSeen[prefixMod] = i;
    }
  }

  return false;
};