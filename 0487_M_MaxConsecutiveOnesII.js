// O(n) time complexity
// O(1) space complexity
// Time to complete: 8:44 min
// Patterns: Sliding Window
// Notes w.r.t. solution: Failed on time twice before by pursuing more complex strategies.
//    I had started with this strategy first but got derailed.
//    Time seems fair as false strategies didn't give me much insight.
//    Actual time if pursued would have been higher, but not by much.
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let maxOnes = 1;

  // get max # 1s using sliding window
  // when determining, if currently counting, skip at most 1 zero
  let zerosCount = 0;
  let left = -1;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zerosCount++;
    }

    while (left <= right && 1 < zerosCount) {
      left++;
      if (nums[left] === 0) {
        zerosCount--;
      }
    }

    maxOnes = Math.max(maxOnes, right - left);
  }

  return maxOnes;
};