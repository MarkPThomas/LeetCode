// 2025/02/25
// O(n) time complexity
// O(1) space complexity
// Time to complete: (21:10 + 4:39) = 25:49 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up w/ State Reduction
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  let dp1 = nums[0];
  let dp1PrevPrev = 0;
  for (let i = 1; i < nums.length - 1; i++) {
    const dp1Prev = dp1;
    dp1 = Math.max(dp1Prev, dp1PrevPrev + nums[i]);
    dp1PrevPrev = dp1Prev;
  }

  let dp2 = nums[1];
  let dp2PrevPrev = 0;
  for (let i = 2; i < nums.length; i++) {
    const dp2Prev = dp2;
    dp2 = Math.max(dp2Prev, dp2PrevPrev + nums[i]);
    dp2PrevPrev = dp2Prev;
  }

  return Math.max(dp1, dp2);
};

// 2025/02/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 21:10 min
// Patterns: Dynamic Programming
// Notes w.r.t. solution: Bottom-Up
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  // DP of normal house problem, but w/ 2 cases - starting w/ first house & skipping it
  // Need to account for how that affects the final option. Offset start/end ranges
  const dp1 = Array(nums.length).fill(0);
  for (let i = 0; i < nums.length - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1] ?? 0, (dp1[i - 2] ?? 0) + nums[i]);
  }

  const dp2 = Array(nums.length).fill(0);
  for (let i = 1; i < nums.length; i++) {
    dp2[i] = Math.max(dp2[i - 1] ?? 0, (dp2[i - 2] ?? 0) + nums[i]);
  }

  const last1 = nums.length - 2 < 0 ? 0 : nums.length - 2;
  const last2 = nums.length - 1 < 0 ? 0 : nums.length - 1;
  return Math.max(dp1[last1], dp2[last2]);
};