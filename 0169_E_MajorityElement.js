// O(N) time complexity
// O(N) space complexity
// Time to complete: 4:11 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
  let frequency = {};
  for (let i = 0; i < nums.length; i++) {
      if (!frequency[nums[i]]) {
          frequency[nums[i]] = 1;
      } else {
          frequency[nums[i]]++;
      }
  }

  let majorityThreshold = nums.length / 2;
  for (let key in frequency) {
      if (frequency[key] > majorityThreshold) {
          return key;
      }
  }
  return -1;
};

// O(nLog(n)) time complexity
// O(1) space complexity (sorted in place)

/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElementWithSort = function(nums) {
  nums.sort();

  // Since majority occurs > n/2 times, it exists at index = n/2
  // Use floor rounding to get index = 0 for array of length 1
  let majorityThresholdIndex = Math.floor(nums.length / 2);
  return nums[majorityThresholdIndex];
};