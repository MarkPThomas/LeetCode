// 2025/03/20
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 21:52 min @ 75/223, then OT
// Patterns: Dynamic Programming - Bottom-Up - LIS
// Notes w.r.t. solution: I was on the right track
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  // subsequence length (1, 2, 3... nums.length)
  //  count instances of each length
  const dpLength = Array(nums.length).fill(1);
  const dpCount = Array(nums.length + 1).fill(0);
  dpCount[1] = nums.length;

  for (let end = 1; end < nums.length; end++) {
    // States
    // Curr # idx
    // Prev length count
    for (let curr = 0; curr < end; curr++) {
      if (nums[curr] < nums[end]) {
        dpLength[end] = Math.max(dpLength[end], dpLength[curr] + 1);
        dpCount[dpLength[end]]++;
      }
    }
  }

  for (let i = dpCount.length - 1; i >= 0; i--) {
    if (dpCount[i]) {
      return dpCount[i];
    }
  }
};

// ===== Solutions =====
// O(n^2) time complexity
// O(n) space complexity
// Patterns: Dynamic Programming - Bottom-Up - LIS
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  // Length of a LIS that end at a given index in nums
  const lengths = Array(nums.length).fill(1);

  // Count of LIS that end at a given index in nums
  const counts = Array(nums.length).fill(1);

  for (let end = 0; end < nums.length; end++) {
    for (let curr = 0; curr < end; curr++) {
      if (nums[curr] < nums[end]) {
        // Update max subsequence length ending at 'end'
        if (lengths[curr] + 1 > lengths[end]) {
          lengths[end] = lengths[curr] + 1;
          // Since this is the first LIS of this new length ending here, we reset the count
          counts[end] = 0;
        }

        // Increment count of LIS ending here
        //  by the amount ending at the adjacent prior num in the LIS
        if (lengths[curr] + 1 === lengths[end]) {
          counts[end] += counts[curr];
        }
      }
    }
  }

  // Get LIS length
  let maxLength = 0;
  for (const length of lengths) {
    maxLength = Math.max(maxLength, length);
  }

  let maxLengthCount = 0;
  for (let i = 0; i < nums.length; i++) {
    // Increment by # of LIS that end at this num
    if (lengths[i] === maxLength) {
      maxLengthCount += counts[i];
    }
  }

  return maxLengthCount;
};